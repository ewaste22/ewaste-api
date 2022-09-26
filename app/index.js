/**
 * @file Bootstrap express.js server
 */

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const router = require("../config/routes");

const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "./views");
const app = express();

/* .env variables */
require("dotenv").config();

/* Middlewares cors */
app.use(cors());

/** Install request logger */
app.use(morgan("dev"));

/** Install body parser */
app.use(express.urlencoded({ extended: true }));

/** Install JSON request parser */
app.use(express.json());

/** Install View Engine */
app.set("views", viewsDir);
app.set("view engine", "ejs");

/** Set Public Directory */
app.use(express.static(publicDir));

/** Install Router */
app.use(router);

module.exports = app;
