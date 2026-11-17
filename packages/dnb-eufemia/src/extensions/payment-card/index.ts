/**
 * Component Entry
 *
 */

import PaymentCard from './PaymentCard'
import { formatCardNumber } from './components/CardNumber'
export default PaymentCard
export * from './PaymentCard'
export { formatCardNumber }
export { default as VisaLogo } from './icons/providers/VisaDefault'
export { default as MastercardLogo } from './icons/providers/MastercardDefault'
export { default as BankAxeptLogo } from './icons/providers/BankAxept'
