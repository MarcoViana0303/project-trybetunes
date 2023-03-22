import { Route, Switch } from 'react-router-dom';
import React from 'react';

import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div className="div-style">
        <p>
          {' '}
          <h1>TrybeTunes</h1>
        </p>
        <Switch>
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="/" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;