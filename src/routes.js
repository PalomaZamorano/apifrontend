import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Dashboard from './views/Dashboard';
i


const routing = (
    <Router>
      <div>
      <Route path="/home" component={Dashboard} />
      </div>
    </Router>
  )

  ReactDOM.render(routing, document.getElementById('root'))

