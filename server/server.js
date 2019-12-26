const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const SERVER_PORT = process.env.PORT || 7000;

app.listen(SERVER_PORT, () => console.log(`Server Up and Running on PORT ${SERVER_PORT}`));