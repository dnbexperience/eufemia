import StringComponent from './String'
import NumberComponent from './Number'
import Toggle from './Toggle'
import BooleanComponent from './Boolean'
import Currency from './Currency'
import DateComponent from './Date'
import Email from './Email'
import NationalIdentityNumber from './NationalIdentityNumber'
import PhoneNumber from './PhoneNumber'
import OrganizationNumber from './OrganizationNumber'
import PostalCodeAndCity from './PostalCodeAndCity'
import Selection from './Selection'
import ArraySelection from './ArraySelection'
import Option from './Option'
import SelectCountry from './SelectCountry'
import BankAccountNumber from './BankAccountNumber'
import CountryCode from './CountryCode'

const Field = {
  String: StringComponent,
  Number: NumberComponent,
  Toggle,
  Boolean: BooleanComponent,
  Currency,
  Date: DateComponent,
  Email,
  NationalIdentityNumber,
  OrganizationNumber,
  PhoneNumber,
  PostalCodeAndCity,
  Selection,
  ArraySelection,
  Option,
  SelectCountry,
  BankAccountNumber,
  CountryCode,
}

export default Field
