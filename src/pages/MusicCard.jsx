import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
    musicaFavorita: [],
  };

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const musicaPreferidas = await getFavoriteSongs();
      if (musicaPreferidas) {
        this.setState({
          musicaFavorita: musicaPreferidas,
          loading: false,
        });
      }
    });
  }

  musicFavorite = () => {
    const { track } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      await addSong(track);
      const musics = await getFavoriteSongs();

      this.setState({
        loading: false,
        musicaFavorita: musics,
      });
    });
  };

  render() {
    const { idMusic, url, nameMusic, track } = this.props;
    const { loading, musicaFavorita } = this.state;

    return (
      loading ? <p>Carregando...</p> : (
        <div>
          {(idMusic && url) !== undefined && (
            <div>
              <audio data-testid="audio-component" src={ url } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              {nameMusic}
            </div>
          )}
          <div>
            {' '}
            <label htmlFor="idCheckbox">
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${track.trackId}` }
                id="idCheckbox"
                defaultChecked={ musicaFavorita.some((elemento) => (
                  elemento.trackId === track.trackId
                )) }
                onClick={ this.musicFavorite }
              />

            </label>
            {' '}

          </div>

        </div>

      )
    );
  }
}

MusicCard.propTypes = {
  idMusic: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  nameMusic: PropTypes.string.isRequired,
  track: PropTypes.instanceOf(Object).isRequired,
};

export default MusicCard;
