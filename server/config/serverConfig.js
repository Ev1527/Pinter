const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const verifyAccessToken = require("../middleware/verifyJWT");

const serverConfig = (app) => {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(cookieParser());
  app.use(verifyAccessToken);
};

module.exports = serverConfig;
