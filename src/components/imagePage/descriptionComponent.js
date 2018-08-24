import React, { Component } from 'react';

class ImageDescription extends Component {
  render() {
    return (
      <div className="description_box">
        {this.props.desc}
      </div>
    )
  }
}

export default ImageDescription;