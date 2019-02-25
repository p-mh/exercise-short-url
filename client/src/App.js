import React, { Component } from 'react';

import { createShortUrl } from './utils/APIcall';

import './App.css';

class App extends Component {
  state = {
    inputValue: '',
    shortUrl: '',
  };
  changeInputValue = ({ target: { value: inputValue } }) => {
    this.setState({
      inputValue,
    });
  };
  getShortUrl = async () => {
    const shortUrl = await createShortUrl(this.state.inputValue);
    this.setState({
      shortUrl,
    });
  };
  render() {
    const shortUrl = this.state.shortUrl && (
      <div>
        <a href={this.state.shortUrl}>{this.state.shortUrl}</a>
      </div>
    );
    return (
      <div className="App">
        <div>
          <input
            type="text"
            onChange={this.changeInputValue.bind(this)}
            value={this.state.inputValue}
          />
          <button onClick={this.getShortUrl.bind(this)}>Shorten</button>
        </div>
        {shortUrl}
      </div>
    );
  }
}

export default App;
