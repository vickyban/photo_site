import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/homePage.js';
import NavBar from './components/headerComponent.js';
import Footer from './components/footerComponent.js';
import Image from './pages/imagePage.js';
import './styles/main.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="main_container">
          <NavBar />
          <Route name="home" exact path="/" component={HomePage} />
          <Route name="image" path={`/image/:id`} component={Image} />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;