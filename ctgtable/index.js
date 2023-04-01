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

export const getTabledata = (
  data,
  basekey,
  filterkey,
  filterval,
  timePeriod
) => {
  const filterData = data.filter((item) => item[filterkey] === filterval);
  const finalData = filterData.map((item) => ({
    ...item,
    [item['FISCAL_YEAR_WEEK']]: Number(item['CW_CTG_PER_VAL']).toFixed(2),
  }));
  const total = finalData.reduce((accum, item) => {
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

  const totalObj = Object.keys(total).reduce((acccum, item) => {
    return [...acccum, { [item]: total[item] }];
  }, []);
  const dates = [...new Set(filterData.map((item) => item.FISCAL_YEAR_WEEK))];
  const headers = dates.map((item) => ({
    key: item,
    label: timePeriod + ('' + item).slice(-2),
  }));
  const products = [
    ...new Set(filterData.map((item) => item[basekey])),
    'Total',
  ];
  const groupByLob = groupByKey(finalData, basekey);
  for (const item in groupByLob) {
    dates.map((date) => {
      const obj = groupByLob[item]?.find(
        (obj) => obj.FISCAL_YEAR_WEEK === date
      );
      if (obj === undefined) {
        groupByLob[item].push({ date: '-' });
      }
    });
  }
  return {
    headers,
    data: { ...groupByLob, Total: totalObj },
    products,
  };
};
