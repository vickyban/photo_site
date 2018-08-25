import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image from 'components/imagePage/imageComponent.js';
import Imgur from 'lib/imgur.js'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    }
    this.fetchPhotos();
  }

  fetchPhotos() {
    const imgur = new Imgur();
    imgur.fetchMainGallery()
      .then(photoList => this.setState({ photos: photoList }))
  }

  displayPhotos() {
    const photoList = this.state.photos;
    if (photoList.length > 0) {
      let photoDivs = photoList.map(photo => {
        return <div className='photo_div'>
          <Link to={"/image/" + photo.id}>
            <Image id={photo.id}></Image>
          </Link>
        </div>
      })
      return photoDivs;
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1>Hello! Welcome to the future photo site</h1>
          <h2>Made by Faizan and Vicky</h2>
          <Link to="/image/DApaUl0">Here&#39;s an image.</Link>
          {this.displayPhotos()}
        </div>
      </div>
    )
  }
}

export default HomePage;