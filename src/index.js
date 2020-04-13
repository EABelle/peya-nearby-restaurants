import React from 'react';
import ReactDOM from 'react-dom';
import './client/index.css';
import App from './client/App';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const myEnv = dotenv.config();
dotenvExpand(myEnv);

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
