/**
 * Because of an Yarn bug, where devDependencies do not get checked by audit,
 * we rename devDependencies to optionalDependencies and visaversa
 *
 */

import prepareForAudit from './prepareForAudit'

prepareForAudit('fromDevToOpt')
