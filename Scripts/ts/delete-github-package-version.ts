/*
 * delete-github-package-version.ts
 *
 *   Created: 2022-11-27-05:39:27
 *   Modified: 2022-12-05-04:15:02
 *
 *   Author: David G. Moore, Jr. <david@dgmjr.io>
 *
 *   Copyright © 2022-2023 David G. Moore, Jr., All Rights Reserved
 *      License: MIT (https://opensource.org/licenses/MIT)
 */

import process from 'process';
import { deletePackageVersionAsync } from "./github-cli.js";
import { PackageType, toPackageType, toSemVer } from './github-cli-types.js';

const argv = process.argv.join(' ');
console.log(`argv: ${argv}`);

function getArg(...sentinels: string[]): string | undefined {
  for (const sentinel of sentinels) {
    const regex = new RegExp(`^.*--${sentinel}(?:[=:]|\\s*)(?<value>[\\S]*).*$`);
    console.log(`regex: ${regex}`);
    if (regex.test(argv))
      return RegExp(regex).exec(argv)?.groups!["value"] ?? undefined;
  }
  return undefined;
};

const orgId = getArg("org", "organization");
const packageId = getArg("id", "package-id", "pkgid");
const version = toSemVer(getArg("version", "package-version"));
const packageType: PackageType = toPackageType(getArg("type", "package-type"));
const token = getArg("token", "k", "github-token");

console.log(`Args: org: ${orgId}, packageId: ${packageId}, version: ${version.format()}, packageType: ${packageType}, token: ${token}`);

if (orgId === undefined) {
  throw new Error("Organization is required");
}

if (packageId === undefined) {
  throw new Error("Package ID is required");
}

if (version === undefined) {
  throw new Error("Package version is required");
}

if (packageType === undefined) {
  throw new Error("Package type is required");
}

if (token === undefined) {
  throw new Error("GitHub API token is required");
}

await deletePackageVersionAsync(orgId, packageId, version, packageType, token);

// console.log(`main: ${main}`);

