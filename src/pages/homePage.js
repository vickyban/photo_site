import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Hello! Welcome to the future photo site</h1>
          <h2>Made by Faizan and Vicky</h2>
          <Link to="/image/DApaUl0">Here&#39;s an image.</Link>
        </div>
      </div>
    )
  }
}

export default HomePage;