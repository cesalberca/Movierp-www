import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import App from './views/App';
import Home from './views/Home';
import Cinemas from './views/Cinemas';
import Employees from './views/Employees';
import Users from './views/Users';
import Rooms from './views/Rooms';
import Clients from './views/Clients';
import Providers from './views/Providers';

import './stylesheets/reset.css';
import './stylesheets/variables.css';
import './stylesheets/colors.css';
import './stylesheets/typography.css';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="cinemas" component={Cinemas} />
      <Route path="employees" component={Employees} />
      <Route path="users" component={Users} />
      <Route path="rooms" component={Rooms} />
      <Route path="clients" component={Clients} />
      <Route path="providers" component={Providers} />
    </Route>
  </Router>,
  document.getElementById('root')
);
