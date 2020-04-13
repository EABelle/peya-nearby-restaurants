import "@babel/polyfill";
import dotenv from 'dotenv';
import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import authRouter from './routes/LoginRouter';
import myAccountRouter from './routes/MyAccountRouter';
import restaurantsRouter from './routes/RestaurantsRouter';
import staticsRouter from './routes/StatisticsRouter';
import configRouter from './routes/ConfigRouter';
import verifyAppToken from "./middlewares/verifyAppToken";
import { setRestaurantsTTL } from "./middlewares/cache";

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'http://localhost:3001');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(verifyAppToken);
app.use(setRestaurantsTTL);
app.use('/api/statistics', staticsRouter);
app.use('/api/login', authRouter);
app.use('/api/myAccount', myAccountRouter);
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/config', configRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.sendStatus(err.status || 500);
});

module.exports = app;
