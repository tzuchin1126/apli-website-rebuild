[CmdletBinding()]
param(
    [ValidateSet('Debug', 'Release')]
    [string]$Configuration = 'Release'
)

$ErrorActionPreference = 'Stop'

$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$projectFile = Join-Path $projectRoot 'apli-website-rebuild.csproj'
$artifactRoot = Join-Path $projectRoot 'artifacts\plesk'
$publishRoot = Join-Path $artifactRoot 'publish'
$zipPath = Join-Path $artifactRoot 'apli-plesk-publish.zip'

if (Test-Path -LiteralPath $artifactRoot) {
    Remove-Item -LiteralPath $artifactRoot -Recurse -Force
}

New-Item -ItemType Directory -Path $publishRoot -Force | Out-Null

Write-Host "Publishing $Configuration build..."
& dotnet publish $projectFile `
    --configuration $Configuration `
    --output $publishRoot

if ($LASTEXITCODE -ne 0) {
    throw "dotnet publish failed with exit code $LASTEXITCODE."
}

$requiredFiles = @(
    'appsettings.Production.json',
    'web.config',
    'apli-website-rebuild.dll',
    'Pages\Shared\_Footer.cshtml'
)

foreach ($relativePath in $requiredFiles) {
    $fullPath = Join-Path $publishRoot $relativePath
    if (-not (Test-Path -LiteralPath $fullPath)) {
        throw "Required publish file is missing: $relativePath"
    }
}

# Compress the contents of publish, not the publish directory itself.
# This keeps web.config, the DLL, Pages, and wwwroot at the archive root
# when Plesk extracts the ZIP directly into /httpdocs.
Compress-Archive `
    -Path (Join-Path $publishRoot '*') `
    -DestinationPath $zipPath `
    -Force

Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
try {
    $normalizedEntries = @(
        $archive.Entries | ForEach-Object {
            $_.FullName.Replace('\', '/')
        }
    )

    $topLevelEntries = @(
        $normalizedEntries | ForEach-Object {
            $_.Split('/')[0]
        } | Sort-Object -Unique
    )

    if ($topLevelEntries -contains 'APLI') {
        throw 'The ZIP contains an unexpected APLI wrapper directory.'
    }

    foreach ($relativePath in $requiredFiles) {
        $zipPathEntry = $relativePath.Replace('\', '/')
        if ($normalizedEntries -notcontains $zipPathEntry) {
            throw "Required ZIP entry is missing: $relativePath"
        }
    }
}
finally {
    $archive.Dispose()
}

Write-Host ''
Write-Host "Publish folder: $publishRoot"
Write-Host "Plesk ZIP:      $zipPath"
Write-Host 'Extract this ZIP directly into /httpdocs.'
Write-Host 'Keep the existing /httpdocs/App_Data directory and its contents.'
