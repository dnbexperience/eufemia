/**
 * This file is used to enable Web Components
 *
 */

import { registerElement } from '../../shared/custom-element'
import PaymentCard from './PaymentCard'
export default PaymentCard
export * from './PaymentCard'

registerElement(PaymentCard.tagName, PaymentCard, PaymentCard.defaultProps)
