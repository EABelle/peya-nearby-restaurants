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
import { setRestaurantsTTL } from "./middlewares/cache";
import cors from 'cors';
import authMiddleware from "./middlewares/auth";
dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(setRestaurantsTTL);
app.use('/api/statistics', staticsRouter);
app.use('/api/login', authRouter);
app.use(authMiddleware);
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
