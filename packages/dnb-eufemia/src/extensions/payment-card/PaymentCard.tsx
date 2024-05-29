import classnames from 'classnames'
import {
  BankLogo,
  ProductLogo,
  BankAxeptLogo,
  StatusIcon,
  CardProviderLogo,
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
import { defaultDesign } from './utils/CardDesigns'
import {
  PaymentCardCardStatus,
  PaymentCardProps,
  PaymentCardRawData,
} from './types'

const defaultCard: (productCode: string) => PaymentCardRawData = (
  productCode
) => ({
  productCode,
  productName: '',
  displayName: '',
  cardDesign: defaultDesign,
  cardType: 'None',
  productType: 'None',
  bankAxept: 'None',
})

const defaultProps = {
  digits: 8,
  //   locale: null,
  card_status: 'active',
  variant: 'normal',

  id: null,
  raw_data: null,

  skeleton: false,
  class: null,
  className: null,
  children: null,

  // translations
  text_card_number: null,
  text_expired: null,
  text_blocked: null,
  text_not_active: null,
  text_order_in_process: null,
  text_renewed: null,
  text_replaced: null,
  text_unknown: null,
}

export default function PaymentCard(props: PaymentCardProps) {
  const context = useContext(Context)

  // const translations = context.getTranslation(props)

  const {
    product_code,
    card_number,
    card_status,
    variant,
    digits,
    id,
    raw_data,
    // locale,
    skeleton,
    className,
    class: _className,
    children, //eslint-disable-line

    text_card_number,
    text_expired,
    text_blocked,
    text_not_active,
    text_order_in_process,
    text_renewed,
    text_replaced,
    text_unknown,

    ...attributes
  } = extendPropsWithContext(props, defaultProps, context?.PaymentCard, {
    skeleton: context?.skeleton,
  })

  const cardData: PaymentCardRawData =
    raw_data || getCardData(product_code)

  const translations = {
    text_card_number,
    text_expired,
    text_blocked,
    text_not_active,
    text_order_in_process,
    text_renewed,
    text_replaced,
    text_unknown,
  }

  const params = {
    className: classnames(
      'dnb-payment-card',
      `dnb-payment-card--${variant}`,
      createSkeletonClass(null, skeleton, context),
      createSpacingClasses(props),
      className,
      _className
    ),
    ...attributes,
  }

  skeletonDOMAttributes(params, skeleton, context)

  // also used for code markup simulation
  validateDOMAttributes(props, params)

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
    <figure {...params}>
      <figcaption className="dnb-sr-only dnb-payment-card__figcaption">
        {cardData.productName}
      </figcaption>
      <div
        id={id}
        className={classnames(
          'dnb-payment-card__card',
          `dnb-payment-card__${cardData.cardDesign.cardStyle}`
        )}
        {...(cardData.cardDesign.backgroundImage
          ? {
              style: {
                backgroundImage: `url(${cardData.cardDesign.backgroundImage})`,
              },
            }
          : {})}
      >
        <div className="dnb-payment-card__card__content">
          <div className="dnb-payment-card__card__top">
            <BankLogo
              logoType={cardData.cardDesign.bankLogo}
              color={cardData.cardDesign.bankLogoColors}
            />
            <ProductLogo
              productType={cardData.productType}
              cardDesign={cardData.cardDesign.cardDesign}
            />

            <BankAxeptLogo bankAxept={cardData.bankAxept} />
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
                {'translations.text_card_number'}
              </P>
              <P className="dnb-payment-card__card__numbers">
                {formatCardNumber(card_number)}
              </P>
            </span>
            <CardProviderLogo
              cardTypeDesign={cardData.cardType}
              color={cardData.cardDesign.visaColors}
            />
          </div>
        </div>

        <BlockingOverlay card_status={card_status} />
      </div>
    </figure>
  )

  function BlockingOverlay({
    card_status,
  }: {
    card_status: PaymentCardCardStatus
  }) {
    return cardStatusMap[card_status] ? (
      <div
        className={classnames(
          'dnb-payment-card__blocking__overlay',
          createSkeletonClass('font', skeleton)
        )}
      >
        <div className="dnb-payment-card__blocking__center">
          <StatusIcon status={card_status} />
          <P top="xx-small">{cardStatusMap[card_status]}</P>
        </div>
      </div>
    ) : null
  }
}

export function formatCardNumber(cardNumber, digits = 8) {
  const formatCardNumberRegex = /(?=(?:....)*$)/g

  if (!cardNumber) {
    return cardNumber
  }
  if (digits && digits <= cardNumber.length) {
    return cardNumber
      .slice(cardNumber.length - digits, cardNumber.length)
      .replace(formatCardNumberRegex, ' ')
      .trim()
  }
  return cardNumber.replace(formatCardNumberRegex, ' ').trim()
}

export const getCardData: (productCode: string) => PaymentCardRawData = (
  productCode
) => {
  const card = cardProducts.find(
    (item) => item.productCode === productCode
  )
  return card || defaultCard(productCode)
}
