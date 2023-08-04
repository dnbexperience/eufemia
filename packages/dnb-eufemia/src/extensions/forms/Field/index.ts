import StringComponent from './String'
import NumberComponent from './Number'
import ToggleComponent from './Toggle'
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
import SelectionComponent from './Selection'
import ArraySelectionComponent from './ArraySelection';
import OptionComponent from './Option'
import SelectCountryComponent from './SelectCountry'

const Field = {
  String: StringComponent,
  Number: NumberComponent,
  Toggle: ToggleComponent,
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
  Selection: SelectionComponent,
  ArraySelection: ArraySelectionComponent,
  Option: OptionComponent,
  SelectCountry: SelectCountryComponent,
}

export default Field
