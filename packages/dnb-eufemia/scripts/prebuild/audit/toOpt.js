/**
 * Because of an Yarn bug, where devDependencies do not get checked by audit,
 * we rename devDependencies to optionalDependencies and vice versa
 *
 */

import prepareForAudit from './prepareForAudit'

prepareForAudit('fromDevToOpt')
