import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  state = {
    bandaArt: '',
    disable: true,
  };

  ativarBotao = () => {
    const { bandaArt } = this.state;
    const threeCharacter = 2;
    const validar = bandaArt.length >= threeCharacter;
    this.setState({
      disable: !validar,
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

  render() {
    const { disable, bandaArt } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>

          <input
            type="text"
            data-testid="search-artist-input"
            name="bandaArt"
            onChange={ this.onInput }
            value={ bandaArt }
            placeholder="Artista/Banda"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disable }
            onClick={ this.ativarBotao }
          >
            Pesquisar
          </button>

        </form>
      </div>

    );
  }
}
