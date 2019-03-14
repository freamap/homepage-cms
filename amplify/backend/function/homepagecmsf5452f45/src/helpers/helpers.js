const helpers = {
  tableNameEnv: (tableName) => {
    if(process.env.ENV && process.env.ENV !== "NONE") {
      tableName = tableName + '-' + process.env.ENV;
    }

    return tableName;
  }
}

module.exports = helpers
