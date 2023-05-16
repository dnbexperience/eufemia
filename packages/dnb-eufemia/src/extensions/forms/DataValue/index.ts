import StringComponent from './String';
import NumberComponent from './Number';
import BooleanComponent from './Boolean';
import CurrencyComponent from './Currency';
import DateComponent from './Date';
import EmailComponent from './Email';
import FirstNameComponent from './FirstName';
import LastNameComponent from './LastName';
import NationalIdentityNumberComponent from './NationalIdentityNumber';
import PhoneNumberComponent from './PhoneNumber';

const DataValue = {
  String: StringComponent,
  Number: NumberComponent,
  Boolean: BooleanComponent,
  Currency: CurrencyComponent,
  Date: DateComponent,
  Email: EmailComponent,
  FirstName: FirstNameComponent,
  LastName: LastNameComponent,
  NationalIdentityNumber: NationalIdentityNumberComponent,
  PhoneNumber: PhoneNumberComponent,
}

export default DataValue;
