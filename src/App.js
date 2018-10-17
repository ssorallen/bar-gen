import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import bwipjs from 'bwip-js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBtn: 'TRAY',
      activeNumber: '',
    };
  }

  componentDidMount() {
    this.genQrCode();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.activeBtn !== prevState.activeBtn ||
      this.state.activeNumber !== prevState.activeNumber
    ) {
      this.genQrCode();
    }
  }

  getQrCodeText() {
    return `${this.state.activeBtn}:${this.state.activeNumber}`;
  }

  setActiveBtn(nextActiveBtn) {
    this.setState({
      activeBtn: nextActiveBtn,
    });
  }

  handleNumpadClick(num) {
    this.setState({
      activeNumber: `${this.state.activeNumber}${num}`,
    });
  }

  handleResetClick = () => {
    this.setState({
      activeNumber: '',
    });
  };

  genQrCode() {
    bwipjs(
      this._canvas,
      {
        bcid: 'qrcode', // Barcode type
        text: this.getQrCodeText(), // Text to encode
        height: 40, // Bar height, in millimeters
        width: 40,
        includetext: true, // Show human-readable text
        textxalign: 'center', // Always good to set this
      },
      function(err, cvs) {
        if (err) {
          // Decide how to handle the error
          // `err` may be a string or Error object
        } else {
          // Nothing else to do in this example...
        }
      }
    );
  }

  render() {
    return (
      <div className="container text-center" style={{ maxWidth: '540px' }}>
        <canvas
          className="mt-3"
          ref={ref => {
            this._canvas = ref;
          }}
        />
        <h5>
          <pre>
            {this.getQrCodeText()}
            <span className="cursor" />
          </pre>
        </h5>
        <div className="row mt-3">
          <div className="col">
            <button
              className="btn btn-block btn-primary"
              disabled={this.state.activeBtn === 'TRAY'}
              onClick={this.setActiveBtn.bind(this, 'TRAY')}>
              TRAY
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-block btn-success"
              disabled={this.state.activeBtn === 'STATION'}
              onClick={this.setActiveBtn.bind(this, 'STATION')}>
              STATION
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-block btn-warning"
              disabled={this.state.activeBtn === 'CROP'}
              onClick={this.setActiveBtn.bind(this, 'CROP')}>
              CROP
            </button>
          </div>
        </div>
        <div className="mt-5 mx-4">
          <div className="row mt-3">
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 1)}>
                1
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 2)}>
                2
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 3)}>
                3
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 4)}>
                4
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 5)}>
                5
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 6)}>
                6
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 7)}>
                7
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 8)}>
                8
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 9)}>
                9
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col" />
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onClick={this.handleNumpadClick.bind(this, 0)}>
                0
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                disabled={this.state.activeNumber === ''}
                onClick={this.handleResetClick}
                style={{ textIndent: '-6px' }}>
                ⌫
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
