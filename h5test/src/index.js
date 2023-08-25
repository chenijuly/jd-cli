import dva from 'dva';
import routes from '@/routes/router';
import '@/assets/css/init.less';

const createBrowserHistory = require('history').createBrowserHistory;

// initialize
const app = dva({
  history: createBrowserHistory(),
});

// plugins

// model
// app.model(require('./models/app').default)

// router
app.router(routes);

// start
app.start('#root');
