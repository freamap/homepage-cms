var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient();
const helpers = require('../helpers/helpers')

let tableName = helpers.tableNameEnv("homepage_cms_pages");

router.get('/', function(req, res, next) {
  let queryParams = {
    TableName: tableName
  } 

  dynamodb.scan(queryParams, (err, data) => {
    if (err) {
      res.json({error: 'Could not load items: ' + err});
    } else {
      res.json(data.Items);
    }
  });
});

module.exports = router;