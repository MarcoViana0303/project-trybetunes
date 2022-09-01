import React from 'react';
/* import { getUser } from '../services/userAPI'; */

export default class Header extends React.Component {
  render() {
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name" />

      </header>

    );
  }
}
