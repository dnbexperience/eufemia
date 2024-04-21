import {
  SagaGold,
  SagaPlatinum,
  Pluss,
  Intro,
  Business,
  Bedrift,
  PB,
} from '../../icons'
import {
  PrivateBanking,
  ProductType,
  Saga,
  CardDesignObject,
} from '../../types'

const logoClassName = 'dnb-payment-card__card__product-type'

function getSagaLogo(saga: Saga) {
  switch (saga) {
    case Saga.Gold:
      return <SagaGold className={logoClassName} />
    case Saga.Platinum:
      return <SagaPlatinum className={logoClassName} />
    case Saga.None:
    default:
      return null
  }
}

function getPBLogo(privateBanking: PrivateBanking) {
  switch (privateBanking) {
    case PrivateBanking.Default:
      return <PB className={logoClassName} />
    case PrivateBanking.None:
    default:
      return null
  }
}

/**
 * returns logo based on the product type and card design
 */

const ProductLogo = ({
  productType,
  cardDesign,
}: {
  productType: ProductType
  cardDesign: CardDesignObject
}) => {
  switch (productType) {
    case ProductType.Saga:
      return getSagaLogo(cardDesign.saga)
    case ProductType.Pluss:
      return <Pluss className={logoClassName} />
    case ProductType.Intro:
      return <Intro className={logoClassName} />
    case ProductType.Business:
      return <Business className={logoClassName} />
    case ProductType.Bedrift:
      return <Bedrift className={logoClassName} />
    case ProductType.PrivateBanking:
      return getPBLogo(cardDesign.privateBanking)
    default:
      return null
  }
}

export default ProductLogo
