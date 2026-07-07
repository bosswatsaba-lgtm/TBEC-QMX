param(
    [string]$ProjectId = "8908668467853350098",
    [string]$ApiKey = $env:STITCH_API_KEY
)

if (-not $ApiKey) {
    Write-Error "STITCH_API_KEY not set. Set environment variable or pass -ApiKey"
    exit 1
}

$headers = @{ "X-Goog-Api-Key" = $ApiKey }
$url = "https://stitch.googleapis.com/mcp"
$outDir = Join-Path (Get-Location) "stitch-output"

New-Item -ItemType Directory -Force -Path (Join-Path $outDir "screenshots") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $outDir "code") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $outDir "screens") | Out-Null

$screenIds = @(
    "0189bf3f029d40a6a79fac67e2f359b7",
    "1a2aecbcaf1b48daa98c571512325d77",
    "380df5050f284741b98695fcc24d988a",
    "40c2031c717c498aaa965b5593aac2e3",
    "42a5517bc4fd457ca2faafe985571eba",
    "7053847ce67c47d6bef7e28a1633811c",
    "8c8436eaf09b4a5791e531b69c15b281",
    "9392218e419946d990485cf5aa3974d3",
    "ac3c9cc8fd734b27b0b2b023d5d0bea2",
    "b245511d571b459e988d59c3c98547b7",
    "bad771fa60564669acbc88df243ab565",
    "cc230d2146da4f22a34a221744f55393",
    "cc822cf3a63f4c72a4c959ffee5a075a",
    "cec09e8f761f40d3a8b851458a4a996a",
    "efc7a94101384ab6ac348bfcad051e8a"
)

foreach ($sid in $screenIds) {
    $body = @{
        method = "tools/call"
        params = @{
            name = "get_screen"
            arguments = @{
                screenId = $sid
                projectId = $ProjectId
            }
        }
        id = 7
        jsonrpc = "2.0"
    } | ConvertTo-Json -Depth 5

    Write-Output "Fetching: $sid ..."

    try {
        $response = Invoke-RestMethod -Method Post -Uri $url -Headers $headers -ContentType "application/json" -Body $body
        $screen = $response.result.structuredContent

        if (-not $screen) {
            Write-Output "  -> No content, skipping"
            continue
        }

        $title = if ($screen.title) { $screen.title } else { "untitled_$sid" }
        $safeTitle = $title -replace '[^\w\s-]', '' -replace '\s+', '_'
        Write-Output "  -> $title ($($screen.width)x$($screen.height))"

        if ($screen.screenshot -and $screen.screenshot.downloadUrl) {
            $img = Join-Path $outDir "screenshots" "$safeTitle.png"
            Invoke-WebRequest -Uri $screen.screenshot.downloadUrl -OutFile $img -ErrorAction SilentlyContinue
            if (Test-Path $img) { Write-Output "  -> Screenshot saved" }
        }

        if ($screen.htmlCode -and $screen.htmlCode.downloadUrl) {
            $html = Join-Path $outDir "code" "$safeTitle.html"
            Invoke-WebRequest -Uri $screen.htmlCode.downloadUrl -OutFile $html -ErrorAction SilentlyContinue
            if (Test-Path $html) { Write-Output "  -> HTML saved" }
        }

        $screen | ConvertTo-Json -Depth 5 | Out-File -FilePath (Join-Path $outDir "screens" "$safeTitle.json") -Encoding utf8

    } catch {
        Write-Output "  -> Error: $_"
    }
}

Write-Output "`nDone. Files in: $outDir"
