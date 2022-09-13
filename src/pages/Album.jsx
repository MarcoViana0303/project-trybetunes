import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
// eslint-disable-next-line import/no-named-as-default
import MusicCard from './MusicCard';

export default class Album extends React.Component {
  state = {
    idAlbum: [],
    loading: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      loading: true,
    });

    this.setState({
      idAlbum: await getMusics(id),
      loading: false,
    });
  }

  render() {
    const { idAlbum, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />

        <div>

          {loading ? <p>Carregando...</p> : (

            idAlbum.length > 0
            && (
              <div>
                <div
                  data-testid="artist-name"
                >
                  {idAlbum[0].artistName}
                </div>
                <div
                  data-testid="album-name"
                >
                  {idAlbum[0].collectionName}
                </div>

              </div>
            )

          )}

          {
            idAlbum.length > 0
             && (

               idAlbum.map((elemento, index) => (
                 index > 0 && (

                   <div key={ index }>
                     <MusicCard
                       idAlbum={ idAlbum }
                       idMusic={ elemento.trackId }
                       url={ elemento.previewUrl }
                       nameMusic={ elemento.trackName }
                       index={ index }
                       track={ elemento }
                     />

                   </div>
                 )

               ))
             )

          }

        </div>

      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
