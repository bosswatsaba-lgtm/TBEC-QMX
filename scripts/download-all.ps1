param([string]$ApiKey = $env:STITCH_API_KEY)

if (-not $ApiKey) { Write-Error "STITCH_API_KEY not set"; exit 1 }

$headers = @{"X-Goog-Api-Key"=$ApiKey}
$url = "https://stitch.googleapis.com/mcp"
$outDir = Join-Path (Get-Location) "stitch-output"
$codeDir = Join-Path $outDir "code"
New-Item -ItemType Directory -Force -Path $codeDir | Out-Null

# Screen IDs from the project (excluding design system assets)
$screens = @(
    @{id="0189bf3f029d40a6a79fac67e2f359b7"},
    @{id="1a2aecbcaf1b48daa98c571512325d77"},
    @{id="380df5050f284741b98695fcc24d988a"},
    @{id="40c2031c717c498aaa965b5593aac2e3"},
    @{id="42a5517bc4fd457ca2faafe985571eba"},
    @{id="7053847ce67c47d6bef7e28a1633811c"},
    @{id="8c8436eaf09b4a5791e531b69c15b281"},
    @{id="9392218e419946d990485cf5aa3974d3"},
    @{id="ac3c9cc8fd734b27b0b2b023d5d0bea2"},
    @{id="b245511d571b459e988d59c3c98547b7"},
    @{id="bad771fa60564669acbc88df243ab565"},
    @{id="cc230d2146da4f22a34a221744f55393"},
    @{id="cc822cf3a63f4c72a4c959ffee5a075a"},
    @{id="cec09e8f761f40d3a8b851458a4a996a"},
    @{id="efc7a94101384ab6ac348bfcad051e8a"}
)

foreach ($s in $screens) {
    $sid = $s.id
    $body = @{
        method = "tools/call"
        params = @{
            name = "get_screen"
            arguments = @{
                screenId = $sid
                projectId = "8908668467853350098"
            }
        }
        id = 10
        jsonrpc = "2.0"
    } | ConvertTo-Json -Depth 5

    Write-Output "--- $sid ---"
    try {
        $response = Invoke-RestMethod -Method Post -Uri $url -Headers $headers -ContentType "application/json" -Body $body
        $screen = $response.result.structuredContent
        if (-not $screen) { Write-Output "  No data"; continue }

        $title = $screen.title
        if (-not $title) { Write-Output "  No title, skipping"; continue }
        $safeTitle = $title -replace '[\\/:*?"<>|]', '_' -replace '\s+', '_'
        Write-Output "  Title: $title"

        # Download HTML
        if ($screen.htmlCode -and $screen.htmlCode.downloadUrl) {
            $dlUrl = $screen.htmlCode.downloadUrl + "&key=" + $ApiKey
            $htmlPath = Join-Path $codeDir "$safeTitle.html"
            try {
                Invoke-WebRequest -Uri $dlUrl -OutFile $htmlPath -ErrorAction Stop
                Write-Output "  HTML saved: $( (Get-Item $htmlPath).Length ) bytes"
            } catch { Write-Output "  HTML failed: $_" }
        }

        # Download screenshot
        if ($screen.screenshot -and $screen.screenshot.downloadUrl) {
            $imgUrl = $screen.screenshot.downloadUrl + "?key=" + $ApiKey
            $imgPath = Join-Path $codeDir "$safeTitle.png"
            try {
                Invoke-WebRequest -Uri $imgUrl -OutFile $imgPath -ErrorAction Stop
                Write-Output "  Screenshot saved"
            } catch { Write-Output "  Screenshot failed: $_" }
        }

        # Save metadata
        $screen | ConvertTo-Json -Depth 5 | Out-File -FilePath (Join-Path $codeDir "$safeTitle.json") -Encoding utf8
    } catch { Write-Output "  Error: $_" }
}
Write-Output "`nDone"
