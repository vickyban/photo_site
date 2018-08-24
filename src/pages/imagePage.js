import React, { Component } from 'react';
import Image from 'components/imagePage/imageComponent.js';
import Description from 'components/imagePage/descriptionComponent.js';

// Test data.
const id = 'kZNQZqO';
const title = 'Dumperooni One, my phone is just memes, nudes, and Army shit.';
const desc = 'This is going to be a fairly long description, possibly. For now, let\'s leave it at this length';
const author = {
  name: 'Timmy',
  posted: 'Wed Aug 22 2018',
};
const comments = [
  {
    name: 'Tommy',
    comment: 'Cool!',
  },
  {
    name: 'Johnny',
    comment: 'This is dumb.',
  },
];

class ImagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: id || props.match.params.id,
    }
  }

  render() {
    return (
      <div className="container">
        <div>
          <h1 className="title">{title}</h1>
          <h3 className="sub_title">by {author.name}. Posted {author.posted}</h3>
          <Image id={this.state.id} />
          <Description id={this.state.id} desc={desc} />
          {comments.map(comment =>
            <div key={comment.name}>
              {comment.name}
              {comment.comment}
            </div>)
          }
        </div>
      </div>
    )
  }
}

export default ImagePage;
