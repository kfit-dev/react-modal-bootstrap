import React from 'react';
import Header from './Header';
import Footer from './Footer';
import PropTypes from 'prop-types';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div className="layout-page">
        <Header/>
        <main className="layout-main">
          <div className="container">
            {this.props.children}
          </div>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default App;
