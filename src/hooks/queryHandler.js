exports.Query = class QuerysPreprocesor {
  constructor(model = []) {
    this.model = model;
    this.pagination = ['perPage', 'page'];
  }
  querysPreprocesor(querys) {
    const _querys = {
      columns: [],
    };
    for (let key in querys) {
      if (this.model.includes(key)) _querys.columns.push({ field: key, value: querys[key] });
      else
        _querys.aditionals.push({
          field: key,
          value: querys[key],
        });
    }
    return _querys;
  }
  // eslint-disable-next-line no-unused-vars
  setQueryOperations(querys, operation, ignore = []) {
    const { columns } = this.querysPreprocesor(querys);
    const _querys = columns.map(({ field, value }) => ({
      [field]: {
        [operation]: `%${value}%`,
      },
    }));
    return _querys;
  }
};
