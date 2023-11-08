#!/usr/bin/env pwsh

[CmdletBinding()]
[Alias("Delete-GitHubPackageVersion")]
param(
    [Parameter(Mandatory)]
    [Alias("pkg", "p")]
    [string]$PackageId,
    [Parameter(Mandatory)]
    [Alias("ver", "v")]
    [string]$PackageVersion,
    [Alias("t", "gh")]
    [string]$GitHubToken = $env:GITHUB_TOKEN,
    [Parameter(Mandatory)]
    [Alias("org")]
    [string]$GitHubOrganization,
    [Alias("type")]
    [ValidateSet("npm", "maven", "rubygems", "docker", "nuget", "container", IgnoreCase, ErrorMessage = "The package type must be one of the following: npm, maven, rubygems, docker, nuget, container")]
    [string]$PackageType = "nuget"
)

process {
  Write-Output "node '$PSScriptRoot/js/delete-github-package-version.js' delete-package --org $GitHubOrganization -i $PackageId -v "$PackageVersion" -t $PackageType --token $GitHubToken"
  node "$PSScriptRoot/js/delete-github-package-version.js" delete-package --org $GitHubOrganization -i $PackageId -v "$PackageVersion" -t $PackageType --token $GitHubToken
  # Write-Output ""
  # Write-Output "ts-node '$PSScriptRoot/ts/delete-github-package-version' -o $GitHubOrganization -i $PackageId -v "$PackageVersion" -t $PackageType -k $GitHubToken"
  # ts-node $PSScriptRoot/ts/delete-github-package-version -o $GitHubOrganization -i $PackageId -v "$PackageVersion" -t $PackageType -k $GitHubToken
}
