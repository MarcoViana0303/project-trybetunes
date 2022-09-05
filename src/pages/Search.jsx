import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
      </div>

    );
  }
}
