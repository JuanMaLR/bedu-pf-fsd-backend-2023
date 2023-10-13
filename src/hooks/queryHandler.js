exports.querysPreprocesor = function (querys, columns) {
  const newQuerys = {
    columns: [],
    pagination: [],
    aditionals: [],
  };
  for (let key in querys) {
    if (columns.includes(key)) newQuerys.columns.push({ field: key, value: querys[key] });
    else if (['perPage', 'page'].includes(key)) newQuerys.pagination[key] = Number(querys[key]);
    else
      newQuerys.aditionals.push({
        field: key,
        value: querys[key],
      });
  }
  return newQuerys;
};
