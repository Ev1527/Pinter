const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const verifyAccessToken = require('../middleware/verifyJWT');

const serverConfig = (app) => {
  // Добавьте обработчик для запросов метода OPTIONS
  app.options('*', (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', 'https://pinter.fun');
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:4000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send();
  });

  app.use(
    cors({
      origin: 'https://localhost:4000',
      credentials: true,
      methods: 'GET, POST, OPTIONS',
      allowedHeaders: 'Content-Type',
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(cookieParser());
  app.use(verifyAccessToken);
};

module.exports = serverConfig;
