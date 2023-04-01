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
  
};
