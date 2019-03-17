/* @flow */

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import ResourceButton from './ResourceButton';
import bwipjs from 'bwip-js';

type Props = {};

type State = {
  activeBtn: string,
  activeNumber: string,
};

export default class App extends React.Component<Props, State> {
  _canvas: ?HTMLCanvasElement;
  _deleteTimeout: ?TimeoutID;

  constructor(props: Props) {
    super(props);
    this.state = {
      activeBtn: 'BIN',
      activeNumber: '',
    };
  }

  componentDidMount() {
    this.genQrCode();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      this.state.activeBtn !== prevState.activeBtn ||
      this.state.activeNumber !== prevState.activeNumber
    ) {
      this.genQrCode();
    }
  }

  deleteCharacter() {
    // Can't delete if there's no number.
    if (this.state.activeNumber.length === 0) return '';
    const nextActiveNumber = this.state.activeNumber.substr(0, this.state.activeNumber.length - 1);
    this.setState({
      activeNumber: nextActiveNumber,
    });
    return nextActiveNumber;
  }

  deleteRepeat = () => {
    const nextActiveNumber = this.deleteCharacter();
    if (nextActiveNumber.length === 0) return;
    this._deleteTimeout = setTimeout(this.deleteRepeat, 50);
  };

  getQrCodeText() {
    return `${this.state.activeBtn}:${this.state.activeNumber}`;
  }

  handleNumpadClick(num: number) {
    this.setState({
      activeNumber: `${this.state.activeNumber}${num}`,
    });
  }

  handleDeleteClick = () => {
    const nextActiveNumber = this.deleteCharacter();
    if (nextActiveNumber.length === 0) return;
    this._deleteTimeout = setTimeout(this.deleteRepeat, 600);
  };

  handleDeleteTouch = (event: SyntheticTouchEvent<HTMLElement>) => {
    event.preventDefault();
    this.handleDeleteClick();
  };

  handleDeleteHoldEnd = () => {
    if (this._deleteTimeout == null) return;
    clearTimeout(this._deleteTimeout);
    this._deleteTimeout = null;
  };

  setActiveBtn(nextActiveBtn: string) {
    // Choosing a new type should also reset the number because there's little chance you want the
    // same number for that other type.
    this.setState({
      activeBtn: nextActiveBtn,
      activeNumber: '',
    });
  }

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
        <h5 className="mt-2">
          <pre className="mb-0">
            {this.getQrCodeText()}
            <span className="cursor" />
          </pre>
        </h5>
        <div className="row">
          <div className="col my-1">
            <ResourceButton
              active={this.state.activeBtn === 'BIN'}
              className="btn-danger"
              onMouseDown={this.setActiveBtn.bind(this, 'BIN')}
              type="BIN">
              BIN
            </ResourceButton>
          </div>
          <div className="col my-1">
            <ResourceButton
              active={this.state.activeBtn === 'CASE'}
              className="btn-secondary"
              onMouseDown={this.setActiveBtn.bind(this, 'CASE')}
              type="CASE">
              CASE
            </ResourceButton>
          </div>
          <div className="col my-1">
            <ResourceButton
              active={this.state.activeBtn === 'TRAY'}
              className="btn-primary"
              onMouseDown={this.setActiveBtn.bind(this, 'TRAY')}
              type="TRAY">
              TRAY
            </ResourceButton>
          </div>
          <div className="col my-1">
            <ResourceButton
              active={this.state.activeBtn === 'STATION'}
              className="btn-success"
              onMouseDown={this.setActiveBtn.bind(this, 'STATION')}
              type="STATION">
              STATION
            </ResourceButton>
          </div>
          <div className="col my-1">
            <ResourceButton
              active={this.state.activeBtn === 'CROP'}
              className="btn-warning"
              onMouseDown={this.setActiveBtn.bind(this, 'CROP')}
              type="CROP">
              CROP
            </ResourceButton>
          </div>
        </div>
        <div className="mt-3 mx-auto" style={{ width: '240px' }}>
          <div className="row">
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onMouseDown={this.handleNumpadClick.bind(this, 1)}>
                1
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onMouseDown={this.handleNumpadClick.bind(this, 2)}>
                2
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onMouseDown={this.handleNumpadClick.bind(this, 3)}>
                3
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onMouseDown={this.handleNumpadClick.bind(this, 4)}>
                4
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onMouseDown={this.handleNumpadClick.bind(this, 5)}>
                5
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onMouseDown={this.handleNumpadClick.bind(this, 6)}>
                6
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onMouseDown={this.handleNumpadClick.bind(this, 7)}>
                7
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onMouseDown={this.handleNumpadClick.bind(this, 8)}>
                8
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onMouseDown={this.handleNumpadClick.bind(this, 9)}>
                9
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col" />
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                onMouseDown={this.handleNumpadClick.bind(this, 0)}>
                0
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-dark btn-round btn-lg"
                disabled={this.state.activeNumber === ''}
                onMouseDown={this.handleDeleteClick}
                onMouseOut={this.handleDeleteHoldEnd}
                onMouseUp={this.handleDeleteHoldEnd}
                onTouchEnd={this.handleDeleteHoldEnd}
                onTouchStart={this.handleDeleteTouch}
                style={{ textIndent: '-3px' }}>
                ⌫
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
