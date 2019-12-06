import path from 'path';
import express, { json, urlencoded } from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session';
import ConnectRedis from 'connect-redis';
const RedisStore = ConnectRedis(session);
import logger from 'morgan';
import 'dotenv/config';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from '../client/App.jsx';


import ssoRouter from './routes/sso';

const app = express();
const port = process.env.PORT || 8080;

// session
const redisOptions = {
  url: process.env.REDIS_URL,
  ttl: 90*60, // 90 mins are heroku recommendations
}
app.use(session({
  store: new RedisStore(redisOptions),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// view engine setup
app.set('views', path.resolve(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.use('/heroku/sso', ssoRouter);
app.get('/*', (req, res) => {
  const initialState = {};
    if (!req.session || !req.session.id || !req.session.active || !req.session.token) {
        res.status(403);
        initialState.error = `Sorry, you don't have access to this page`;
    } else {
        initialState.token = req.session.token;
        initialState.app = req.session.app;
    }
    const store = createStore((state=initialState) => state);
    const appContent = renderToString(
        <Provider store={store}>
          <App />
        </Provider>
    );
    console.log(appContent, initialState);
    res.render('index', {
        app: appContent,
        initialState: JSON.stringify(initialState),
    });
});


app.listen(port);
export default app;
