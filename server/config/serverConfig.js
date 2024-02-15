const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const verifyAccessToken = require('../middleware/verifyJWT');

const serverConfig = (app) => {
  //Добавьте обработчик для запросов метода OPTIONS
  // app.options('*', (req, res) => {
  //   // res.setHeader("Access-Control-Allow-Origin", "https://pinter.fun");
  //   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  //   res.status(200).send();
  // });
  app.use(express.json({ limit: '200mb' }));
  app.use(express.urlencoded({ limit: '200mb', extended: true }));
  app.use(express.text({ limit: '200mb' }));
  app.use(
    cors({
      origin: 'http://localhost:5173',
      //origin: "https://pinter.fun",
      credentials: true,
      methods: 'GET, POST, OPTIONS',
      // allowedHeaders: 'Content-Type',
    })
  );
  // app.use(express.urlencoded({ extended: true }));
  // app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(cookieParser());
  app.use(verifyAccessToken);
};

module.exports = serverConfig;
