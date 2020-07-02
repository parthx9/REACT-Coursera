import React, { Component } from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
