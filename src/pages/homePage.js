import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image from 'components/imagePage/imageComponent.js';
import Imgur from 'lib/imgur.js'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    }
    this.fetchMainGallery();
  }

  fetchMainGallery() {
    const imgur = new Imgur();
    imgur.fetchMainGallery()
      .then(albums => this.setState({ albums: albums }))
  }

  displayAlbums() {
    const albums = this.state.albums;
    if (albums.length > 0) {
      let albumDivs = albums.map(album => {
        return <div className='album_div' key={album.id} >
          <Link to={"/image/" + album.id}>
            <Image id={album.images[0].id}></Image>
          </Link>
        </div>
      })
      return albumDivs;
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1>Hello! Welcome to the future photo site</h1>
          <h2>Made by Faizan and Vicky</h2>
          <Link to="/image/DApaUl0">Here&#39;s an image.</Link>
          {this.displayAlbums()}
        </div>
      </div>
    )
  }
}

export default HomePage;