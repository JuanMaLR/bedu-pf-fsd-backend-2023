/* eslint-disable no-unused-vars */
const getOffset = (page, limit) => {
  return page * limit - limit;
};

const getNextPage = (page, limit, total) => {
  if (total / limit > page) {
    return page + 1;
  }

  return null;
};

const getPreviousPage = (page) => {
  if (page <= 1) {
    return null;
  }
  return page - 1;
};
exports.paginate = async function (model, pageSize, pageLimit, search = {}, order = [], transform) {
  try {
    const limit = parseInt(pageLimit, 10) || 10;
    const page = parseInt(pageSize, 10) || 1;

    // create an options object
    let options = {
      offset: getOffset(page, limit),
      limit: limit,
    };

    // check if the search object is empty
    if (Object.keys(search).length) options = { ...search, ...options };

    // check if the order array is empty
    if (order && order.length) options['order'] = order;

    // take in the model, take in the options
    let { count, rows } = await model.findAndCountAll(options);

    // check if the transform is a function and is not null
    if (transform && typeof transform === 'function') rows = transform(rows);

    return {
      pagination: {
        previousPage: getPreviousPage(page),
        currentPage: page,
        nextPage: getNextPage(page, limit, count),
        total: count,
        perPage: limit,
      },
      data: rows,
    };
    // return rows;
  } catch (error) {
    console.log(error);
  }
};