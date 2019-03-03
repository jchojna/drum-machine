import React, { Component } from 'react';
import './css/App.css';
import DrumPad from "./DrumPad";
import{
  sideA,
  sideB,
  backgroundStyleA,
  backgroundStyleB
} from './helpers';

import { TIMEOUT, styleMapping } from './Button';

const backgroundMapping = {
  'bgA': backgroundStyleA,
  'bgB': backgroundStyleB
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSide: sideA,
      currentClip: "-",
      currentVolume: 1,
      displayVolume: "VOL: 100 %",
      btnStyle: "inactive",
      displaySide: "SIDE A",
      bgStyle: 'bgA'
    }
  }
  toggleSide = () => {  // TOGGLING SIDES
    this.state.currentSide === sideA ?
    this.setState({
      currentSide: sideB,
      displaySide: "SIDE B",
      bgStyle: 'bgB'
    }) :
    this.setState({
      currentSide: sideA,
      displaySide: "SIDE A",
      bgStyle: 'bgA'
    });
    this.setButtonActive();
    setTimeout(() => this.setButtonInactive(), TIMEOUT);
  }

  displayClipName = (name) => {
    this.setState({
      currentClip: name
    });
  }

  handleVolumeChange = ({ target: { value } }) => {
    this.setState({
      currentVolume: value,
      displayVolume: "VOL: " + Math.round(value * 100) + " %"
    });
  }

  setButtonActive = () => {
    this.setState({
      btnStyle: 'active',
    });
  }
  setButtonInactive = () => {
    this.setState({
      btnStyle: 'inactive'
    });
  }
  setButtonOnHover = () => {
    this.setState({
      btnStyle: 'onHover'
    });
  }

  render() {
    // slider changes are mapped onto all audio elements volume properties
    const clip = [].slice.call(document.getElementsByClassName("clip"));
    clip.forEach(item => {
      item.volume = this.state.currentVolume;
    });

    const {
      bgStyle,
      currentSide,
      btnStyle,
      displaySide,
      currentClip,
      displayVolume
    } = this.state;

    return (
      <div id="container" style={backgroundMapping[bgStyle]}>
        <div id="drum-machine">
          <DrumPad 
            currentSide={currentSide}
            updateDisplay={this.displayClipName}
          />

          <div id="display">
            <div
              class="display-block"
              style={styleMapping[btnStyle]}
              onClick={this.toggleSide}
              onMouseOver={this.setButtonOnHover}
              onMouseOut={this.setButtonInactive}
            >
              {displaySide}
            </div>
            <div class="display-block">
              {currentClip.replace(/-/g," ")}
            </div>
            <div class="display-block">
              {displayVolume}
            </div>
            <div class="display-block">
              <input
                id="slider"
                type="range"
                min="0"
                max="1"
                step="0.01"
                onChange={this.handleVolumeChange}>
              </input>
            </div>
          </div>
        </div>
        <div>
          <span id="side-text">{displaySide.toLowerCase()}</span>
        </div>
      </div>
    );
  }
}

export default App;