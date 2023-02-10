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

      <div className="login-box">

        <form className="form">
          <input
            id="texto-login"
            type="text"
            name="textoLogin"
            value={ textoLogin }
            data-testid="login-name-input"
            className="input"
            placeholder="Nome"
            onChange={ this.onInput }
          />
        </form>
        <div data-testid="page-login" className="user-box">

          {
            loading && <p className="loading-p">Carregando...</p>
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

      </div>

    );
  }
}
