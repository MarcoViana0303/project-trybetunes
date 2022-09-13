import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  /*  state = {
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
  } */

  render() {
    const { idMusic, url, nameMusic } = this.props;
    return (
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

      </div>

    );
  }
}

MusicCard.propTypes = {
  idMusic: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  nameMusic: PropTypes.string.isRequired,
};

export default MusicCard;
