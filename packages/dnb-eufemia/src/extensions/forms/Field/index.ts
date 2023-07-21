import StringComponent from './String'
import NumberComponent from './Number'
import BooleanComponent from './Boolean'
import CurrencyComponent from './Currency'
import DateComponent from './Date'
import EmailComponent from './Email'
import FirstNameComponent from './FirstName'
import LastNameComponent from './LastName'
import NationalIdentityNumberComponent from './NationalIdentityNumber'
import PhoneNumberComponent from './PhoneNumber'
import OrganizationNumberComponent from './OrganizationNumber'
import PostalCodeAndCityComponent from './PostalCodeAndCity'
import SelectComponent from './Select'
import OptionComponent from './Option'
import SelectCountryComponent from './SelectCountry'

const Field = {
  String: StringComponent,
  Number: NumberComponent,
  Boolean: BooleanComponent,
  Currency: CurrencyComponent,
  Date: DateComponent,
  Email: EmailComponent,
  FirstName: FirstNameComponent,
  LastName: LastNameComponent,
  NationalIdentityNumber: NationalIdentityNumberComponent,
  OrganizationNumber: OrganizationNumberComponent,
  PhoneNumber: PhoneNumberComponent,
  PostalCodeAndCity: PostalCodeAndCityComponent,
  Select: SelectComponent,
  Option: OptionComponent,
  SelectCountry: SelectCountryComponent,
}

export default Field
