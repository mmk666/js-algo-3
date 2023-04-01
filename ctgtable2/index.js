const groupByKey = (data, key) => {
  return data.reduce((accum, item) => {
    const obj = { ...accum };
    if (accum[item[key]]) {
      obj[item[key]] = [...accum[item[key]], item];
    } else {
      obj[item[key]] = [item];
    }
    return obj;
  }, {});
};

export const getTabledata = (data, basekey, filterkey, filterval) => {
  const filterData = data.filter((item) => item[filterkey] === filterval);
  const dates = [...new Set(filterData.map((item) => item.FISCAL_YEAR_WEEK))];
  const Total = filterData.reduce((accum, item) => {
    const obj = { ...accum };
    if (accum[item['FISCAL_YEAR_WEEK']]) {
      obj[item['FISCAL_YEAR_WEEK']] = (
        Number(accum[item['FISCAL_YEAR_WEEK']]) + Number(item['CW_CTG_PER_VAL'])
      ).toFixed(2);
    } else {
      obj[item['FISCAL_YEAR_WEEK']] = Number(item['CW_CTG_PER_VAL']).toFixed(2);
    }
    return obj;
  }, {});
  const products = [
    ...new Set(filterData.map((item) => item[basekey])),
    'Total',
  ];
  const groupByProducts = groupByKey(filterData, basekey);
  for (const product in groupByProducts) {
    const obj = groupByKey(groupByProducts[product], 'FISCAL_YEAR_WEEK');
    const item = dates.reduce((accum, item) => {
      accum[item] = obj[item]
        ? Number(obj[item][0]['CW_CTG_PER_VAL']).toFixed(2)
        : '-';
      return accum;
    }, {});
    groupByProducts[product] = item;
  }
  return { ...groupByProducts, Total };
};
