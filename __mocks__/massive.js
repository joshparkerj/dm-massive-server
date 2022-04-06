module.exports = function massive() {
  const data = [];

  return new Promise((resolve) => {
    resolve({
      get_all: () => (new Promise((resolveGetAll) => { resolveGetAll(data); })),
      insert_data: ([username, email]) => (new Promise((resolveInsertData) => {
        data.push({ username, email });
        resolveInsertData();
      })),
    });
  });
};
