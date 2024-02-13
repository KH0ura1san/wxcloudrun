const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { init: initDB, Counter } = require("./db");

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
  const fs = require('fs')
  const request = require('request')
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      // url: 'http://api.weixin.qq.com/wxa/msg_sec_check?access_token=TOKEN',
      url: 'http://api.weixin.qq.com/wxa/msg_sec_check', // 这里就是少了一个token
      body: JSON.stringify({
        "articles": [
          {
            "title": "Test",
            "digest": "测试",
            "content": "测试内容",
          }
        ]
      })
    },function (error, response) {
      console.log('接口返回内容', response.body)
      resolve(JSON.parse(response.body))
    })
  })

});


bootstrap();
