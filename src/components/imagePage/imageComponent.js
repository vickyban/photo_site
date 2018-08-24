import React, { Component } from 'react';

class Image extends Component {
  render() {
    return (
      <div className="container">
        <img alt="potentially funny" src={`https://i.imgur.com/${this.props.id}.jpg`} />
      </div>
    )
  }
}

export default Image;