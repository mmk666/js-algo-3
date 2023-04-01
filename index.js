import mock from './ctgtable/mock.json';

import { getTabledata } from './ctgtable2';

console.log(
  getTabledata(mock, 'SUB_LOB_VAL', 'MEASURE_NAME', 'ST_RPTD_QTY', 'W')
);
