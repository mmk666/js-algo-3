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

const getTotal = (data) =>
  data.reduce((accum, item) => {
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

const getDates = (data) => [
  ...new Set(data.map((item) => item.FISCAL_YEAR_WEEK)),
];

export const groupByPartners = (data, basekey) => {
  const dates = getDates(data);
  const SubTotal = getTotal(data);
  const subGroup = groupByKey(data, basekey);
  for (const partner in subGroup) {
    const obj = groupByKey(subGroup[partner], 'FISCAL_YEAR_WEEK');
    const item = dates.reduce((accum, item) => {
      accum[item] = obj[item]
        ? Number(obj[item][0]['CW_CTG_PER_VAL']).toFixed(2)
        : '-';
      return accum;
    }, {});
    subGroup[partner] = item;
  }
  return { ...subGroup, SubTotal };
};

export const getPartnerTabledata = (data, basekey, subbasekey) => {
  const Total = getTotal(data);
  const groupByProducts = groupByKey(data, basekey);
  for (const product in groupByProducts) {
    const obj = groupByPartners(groupByProducts[product], subbasekey);
    groupByProducts[product] = obj;
  }
  return { ...groupByProducts, Total };
};
