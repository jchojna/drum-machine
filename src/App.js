import React, { Component } from "react";
import "./css/App.css";

import {
  sideA,
  sideB,
  inActiveStyle,
  activeStyle,
  onHoverStyle,
  backgroundStyleA,
  backgroundStyleB
} from "./helpers";

import DrumPad from './DrumPad'

/*

git status
git add
git commit -m
git pull
git pull origin master
git push origin master
git checkout 'nazwa branch'
git checkout -b 'nazwa_nowego_branch'

*/

//////////////////////////////////////////// MAIN APP
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSide: sideA,
      currentClip: "-",
      currentButtonStyle: inActiveStyle,
      currentVolume: 1,
      displayVolume: "VOL: 100 %",
      buttonStyle: inActiveStyle,
      displaySide: "SIDE A",
      backgroundStyle: backgroundStyleA
    };
  }
  toggleSide = () => {
    // TOGGLING SIDES
    this.state.currentSide === sideA
      ? this.setState({
          currentSide: sideB,
          displaySide: "SIDE B",
          backgroundStyle: backgroundStyleB
        })
      : this.setState({
          currentSide: sideA,
          displaySide: "SIDE A",
          backgroundStyle: backgroundStyleA
        });
    this.setButtonActive();
    setTimeout(() => this.setButtonInactive(), 200);
  }
  displayClipName = (name) => {
    this.setState({
      currentClip: name
    });
  }
  handleVolumeChange = ({ target: { value }}) => {
    this.setState({
      currentVolume: value,
      displayVolume: "VOL: " + Math.round(value * 100) + " %"
    });
  }
  setButtonActive = () => {
    this.setState({
      buttonStyle: activeStyle
    });
  }
  setButtonInactive = () => {
    this.setState({
      buttonStyle: inActiveStyle
    });
  }
  setButtonOnHover = () => {
    this.setState({
      buttonStyle: onHoverStyle
    });
  }

  render() {
    // slider changes are mapped onto all audio elements volume properties
    const clip = [].slice.call(document.getElementsByClassName("clip"));
    clip.forEach(item => {
      item.volume = this.state.currentVolume;
    });
    return (
      <div id="container" style={this.state.backgroundStyle}>
        <div id="drum-machine">
          <DrumPad
            currentSide={this.state.currentSide}
            updateDisplay={this.displayClipName}
          />

          <div id="display">
            <div
              class="display-block"
              style={this.state.buttonStyle}
              onClick={this.toggleSide}
              onMouseOver={this.setButtonOnHover}
              onMouseOut={this.setButtonInactive}
            >
              {this.state.displaySide}
            </div>
            <div class="display-block">
              {this.state.currentClip.replace(/-/g, " ")}
            </div>
            <div class="display-block">{this.state.displayVolume}</div>
            <div class="display-block">
              <input
                id="slider"
                type="range"
                min="0"
                max="1"
                step="0.01"
                onChange={this.handleVolumeChange}
              />
            </div>
          </div>
        </div>
        <div>
          <span id="side-text">{this.state.displaySide.toLowerCase()}</span>
        </div>
      </div>
    );
  }
}

export default App;
