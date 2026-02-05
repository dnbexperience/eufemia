/**
 * This file will be transformed by makeReleaseVersion.ts
 */

import { version, sha, buildDate } from './BuildInfoData.js'

export const getVersion = () => {
  return version
}

export const getSha = () => {
  return sha
}

export const getBuildDate = () => {
  return buildDate
}
