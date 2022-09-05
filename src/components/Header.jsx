import { Link } from 'react-router-dom';
import React from 'react';

import { getUser } from '../services/userAPI';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      aparecerNome: false,
    };
  }

  componentDidMount() {
    this.carregarHeader();
  }

  carregarHeader = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      loading: false,
      aparecerNome: true,
    });
    const nome = user.name;
    this.setState({
      name: nome,
    });
  };

  render() {
    const { loading, name, aparecerNome } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          <Link data-testid="link-to-search" to="/search">Search</Link>

        </div>

        <div>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>

        </div>
        <div>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </div>
        <div data-testid="header-user-name">

          {loading && <p>Carregando...</p> }
          {aparecerNome && <p>{name}</p>}

        </div>

      </header>

    );
  }
}
