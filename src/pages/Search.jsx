import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
  state = {
    bandaArt: '',
    disable: true,
    loading: false,
    cantor: [],
    bandaArtInput: '',
  };

  ativarBotao = (param) => {
    this.setState(({
      loading: true,
      bandaArt: '',
    }), async () => {
      const artist = await searchAlbumsAPI(param);
      if (artist) {
        this.setState(({
          loading: false,
          cantor: artist || [],
          bandaArtInput: param,
        }));
      }
    });
  };

  onInput = ({ target }) => {
    const { name } = target;
    const valor = target.value;
    this.setState({
      [name]: valor,
    }, () => {
      const { bandaArt } = this.state;
      const threeCharacter = 2;
      const validar = bandaArt.length >= threeCharacter;
      this.setState({
        disable: !validar,

      });
    });
  };

  render() {
    const { disable, bandaArt, loading, cantor, bandaArtInput } = this.state;
    return (
      <div data-testid="page-search">
        <Header />

        {loading ? <p>Carregando...</p>
          : (
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
                onClick={ () => { this.ativarBotao(bandaArt); } }
              >
                Pesquisar
              </button>

            </form>
          )}

        {cantor.length > 0 && <h1>{`Resultado de álbuns de: ${bandaArtInput}`}</h1>}
        {cantor.length === 0 && 'Nenhum álbum foi encontrado'}

        {cantor.map((elemento) => (
          <div key={ elemento.collectionId }>

            <img src={ elemento.artworkUrl100 } alt={ elemento.artistId } />
            <p>{elemento.artistName}</p>
            <p>{elemento.collectionName}</p>
            <Link
              to={ `/album/${elemento.collectionId}` }
              data-testid={ `link-to-album-${elemento.collectionId}` }
            >
              Link
            </Link>
          </div>

        ))}

      </div>

    );
  }
}
