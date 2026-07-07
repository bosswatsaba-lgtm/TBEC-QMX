param(
  [string]$PgDir = "$env:USERPROFILE\pgsql",
  [string]$DataDir = "$PgDir\data",
  [string]$LogFile = "$PgDir\pg.log"
)

$running = Get-Process -Name "postgres" -ErrorAction SilentlyContinue
if ($running) {
  Write-Output "PostgreSQL already running (PID: $($running[0].Id))"
  exit 0
}

Write-Output "Starting PostgreSQL..."
$log = Start-Process -FilePath "$PgDir\bin\pg_ctl" -ArgumentList "start -D `"$DataDir`" -l `"$LogFile`" -w -t 15" -NoNewWindow -Wait -PassThru
Start-Sleep -Seconds 2
$proc = Get-Process -Name "postgres" -ErrorAction SilentlyContinue
if ($proc) {
  Write-Output "PostgreSQL started successfully (PID: $($proc[0].Id))"
  exit 0
} else {
  Write-Output "Failed to start PostgreSQL"
  Get-Content $LogFile -Tail 5 -ErrorAction SilentlyContinue
  exit 1
}
