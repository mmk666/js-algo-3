//import mock from './ctgtable/mock.json';

//import { getTabledata } from './ctgtable2';

import mockPartner from './ctgpartner/mock.json';

import { getPartnerTabledata } from './ctgpartner';

const filterData = mockPartner.filter(
  (item) => item.MEASURE_NAME === 'ST_RPTD_QTY'
);

console.log(
  getPartnerTabledata(filterData, 'SALES_ACCT_SUBTYPE_CD', 'PARTNER_NAME')
);
