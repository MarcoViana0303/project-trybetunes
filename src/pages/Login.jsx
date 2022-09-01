import React from 'react';
import { Redirect } from 'react-router-dom';

import { createUser } from '../services/userAPI';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      btnLogin: true,
      textoLogin: '',
      loading: false,
      redirect: false,
    };
  }

  ativarBotao = () => {
    const { textoLogin } = this.state;
    const threeCharacter = 3;
    const validar = textoLogin.length >= threeCharacter;
    this.setState({
      btnLogin: !validar,
    });
  };

  onInput = ({ target }) => {
    console.log(target);
    const { name } = target;
    const valor = target.value;
    this.setState({
      [name]: valor,
    }, () => {
      this.ativarBotao();
    });
  };

  createUsuario = async () => {
    this.setState({
      loading: true,
    });
    const { textoLogin } = this.state;
    await createUser({ name: textoLogin });
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  render() {
    const { btnLogin, textoLogin, loading, redirect } = this.state;
    return (
      <div data-testid="page-login">

        <input
          type="text"
          name="textoLogin"
          value={ textoLogin }
          data-testid="login-name-input"
          placeholder="Nome"
          onChange={ this.onInput }
        />

        {
          loading && <p>Carregando...</p>
        }

        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ btnLogin }
          onClick={ this.createUsuario }
        >
          Entrar
        </button>

        {
          redirect && <Redirect to="/search" />
        }

      </div>

    );
  }
}
