import classnames from 'classnames'
import {
  BankLogo,
  ProductLogo,
  StatusIcon,
  CardProviderLogo,
  PaymentTypeLogo,
} from './icons'
import Context from '../../shared/Context'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../../components/skeleton/SkeletonHelper'
import { P } from '../../elements'
import {
  extendPropsWithContext,
  validateDOMAttributes,
} from '../../shared/component-helper'
import { useContext } from 'react'
import { createSpacingClasses } from '../../components/space/SpacingUtils'
import cardProducts from './utils/cardProducts'
import {
  PaymentCardType,
  PaymentCardCardStatus,
  PaymentCardProps,
} from './types'
import { convertSnakeCaseProps } from '../../shared/helpers/withSnakeCaseProps'
import { defaultDesign } from './utils/CardDesigns'

const defaultCard: (productCode: string) => PaymentCardType = (
  productCode
) => ({
  productCode,
  ...defaultDesign,
})

const defaultProps = {
  cardNumber: '****************',
  digits: 8,
  cardStatus: 'active',
  variant: 'normal',
  skeleton: false,
}

export default function PaymentCard(props: PaymentCardProps) {
  const context = useContext(Context)

  const translations = context.getTranslation(props).PaymentCard

  const {
    productCode,
    cardNumber,
    cardStatus,
    variant,
    digits,
    id,
    customCard: cardDesignProp,
    skeleton,
    className,
    children, //eslint-disable-line
    ...attributes
  } = extendPropsWithContext(
    convertSnakeCaseProps(props),
    defaultProps,
    context?.PaymentCard,
    {
      skeleton: context?.skeleton,
    }
  )

  const cardDesign = {
    ...getCardDesign(productCode),
    ...cardDesignProp,
  }

  const params = {
    className: classnames(
      'dnb-payment-card',
      `dnb-payment-card--${variant}`,
      createSkeletonClass(null, skeleton, context),
      createSpacingClasses(props),
      className
    ),
    ...attributes,
  }

  const validatedParameters = validateDOMAttributes(
    props,
    skeletonDOMAttributes(params, skeleton, context)
  )

  const cardStatusMap = {
    not_active: translations.text_not_active,
    order_in_process: translations.text_order_in_process,
    renewed: translations.text_renewed,
    replaced: translations.text_replaced,
    blocked: translations.text_blocked,
    expired: translations.text_expired,
    unknown: translations.text_unknown,
  }

  return (
    <figure {...validatedParameters}>
      <figcaption className="dnb-sr-only dnb-payment-card__figcaption">
        {cardDesign.displayName}
      </figcaption>
      <div
        id={id}
        className={classnames(
          'dnb-payment-card__card',
          cardDesign.cardClassName && cardDesign.cardClassName
        )}
        {...(cardDesign.backgroundImage
          ? {
              style: {
                backgroundImage: `url(${cardDesign.backgroundImage})`,
              },
            }
          : {})}
      >
        <div className="dnb-payment-card__card__content">
          <div className="dnb-payment-card__card__top">
            <BankLogo {...cardDesign.bankLogo} />

            <ProductLogo {...cardDesign.productType} />

            <PaymentTypeLogo {...cardDesign.paymentType} />
          </div>
          <div className="dnb-payment-card__card__bottom">
            <span
              className={classnames(
                'dnb-payment-card__card__wrapper',
                createSkeletonClass('font', skeleton)
              )}
            >
              <P
                className="dnb-payment-card__card__holder"
                modifier="x-small medium"
              >
                {translations.text_card_number}
              </P>
              <P className="dnb-payment-card__card__numbers">
                {formatCardNumber(cardNumber, digits)}
              </P>
            </span>
            <CardProviderLogo {...cardDesign.cardProvider} />
          </div>
        </div>

        <BlockingOverlay cardStatus={cardStatus} />
      </div>
    </figure>
  )

  function BlockingOverlay({
    cardStatus,
  }: {
    cardStatus: PaymentCardCardStatus
  }) {
    return cardStatusMap[cardStatus] ? (
      <div
        className={classnames(
          'dnb-payment-card__blocking__overlay',
          createSkeletonClass('font', skeleton)
        )}
      >
        <div className="dnb-payment-card__blocking__center">
          <StatusIcon status={cardStatus} />
          <P top="xx-small">{cardStatusMap[cardStatus]}</P>
        </div>
      </div>
    ) : null
  }
}

export function formatCardNumber(cardNumber: string, digits = 8) {
  const formatCardNumberRegex = /(?=(?:....)*$)/g

  if (!cardNumber) {
    return cardNumber
  }
  if (digits <= cardNumber.length) {
    return cardNumber
      .slice(cardNumber.length - digits, cardNumber.length)
      .replace(formatCardNumberRegex, ' ')
      .trim()
  }
  return cardNumber.replace(formatCardNumberRegex, ' ').trim()
}

export function getCardDesign(productCode: string): PaymentCardType {
  return (
    cardProducts.find((item) => item.productCode === productCode) ||
    defaultCard(productCode)
  )
}
