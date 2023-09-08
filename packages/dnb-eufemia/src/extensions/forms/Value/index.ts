import StringComponent from './String'
import NumberComponent from './Number'
import BooleanComponent from './Boolean'
import Currency from './Currency'
import DateComponent from './Date'
import Email from './Email'
import NationalIdentityNumber from './NationalIdentityNumber'
import PhoneNumber from './PhoneNumber'
import BankAccountNumber from './BankAccountNumber'

const Value = {
  String: StringComponent,
  Number: NumberComponent,
  Boolean: BooleanComponent,
  Currency,
  Date: DateComponent,
  Email,
  NationalIdentityNumber,
  PhoneNumber,
  BankAccountNumber,
}

export default Value
