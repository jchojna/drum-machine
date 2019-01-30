import React, { Component } from 'react';
import './css/App.css';

//////////////////////////////////////////// SIDE A
const sideA = [{
  keyCode: 81,
  id: "Q",
  name: "Heater 1",
  side: "A",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
}, {
  keyCode: 87,
  id: "W",
  name: "Heater 2",
  side: "A",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
}, {
  keyCode: 69,
  id: "E",
  name: "Heater 3",
  side: "A",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
}, {
  keyCode: 65,
  id: "A",
  name: "Heater 4",
  side: "A",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
}, {
  keyCode: 83,
  id: "S",
  name: "Clap",
  side: "A",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
}, {
  keyCode: 68,
  id: "D",
  name: "Open HH",
  side: "A",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
}, {
  keyCode: 90,
  id: "Z",
  name: "Kick'n'hat",
  side: "A",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
}, {
  keyCode: 88,
  id: "X",
  name: "Kick",
  side: "A",
  url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
}, {
  keyCode: 67,
  id: "C",
  name: "Closed HH",
  side: "A",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
}];

//////////////////////////////////////////// SIDE B
const sideB = [{
  keyCode: 81,
  id: "Q",
  name: "Chord 1",
  side: "B",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
}, {
  keyCode: 87,
  id: "W",
  name: "Chord 2",
  side: "B",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
}, {
  keyCode: 69,
  id: "E",
  name: "Chord 3",
  side: "B",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
}, {
  keyCode: 65,
  id: "A",
  name: "Shaker",
  side: "B",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
}, {
  keyCode: 83,
  id: "S",
  name: "Open HH",
  side: "B",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
}, {
  keyCode: 68,
  id: "D",
  name: "Closed HH",
  side: "B",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
}, {
  keyCode: 90,
  id: "Z",
  name: "Punchy Kick",
  side: "B",
  url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
}, {
  keyCode: 88,
  id: "X",
  name: "Side Stick",
  side: "B",
  url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
}, {
  keyCode: 67,
  id: "C",
  name: "Snare",
  side: "B",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
}];

//////////////////////////////////////////// BUTTON STYLES
const activeStyle = {
  backgroundColor: "orange",
  color: "white",
  border: "none"
}
const inActiveStyle = {
  boxSizing: "border-box"
}

const onHoverStyle = {
  backgroundColor: "lightgrey"
}

const backgroundStyleA = {
  backgroundColor: "lightgreen",
  transition: "2s"
}

const backgroundStyleB = {
  backgroundColor: "lightblue",
  transition: "2s"
}

//////////////////////////////////////////// BUTTON
class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonStyle: inActiveStyle
    }
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.setButtonActive = this.setButtonActive.bind(this);
    this.setButtonInactive = this.setButtonInactive.bind(this);
    this.setButtonOnHover = this.setButtonOnHover.bind(this);
  }
  playSound() {
    var sound = document.getElementById(this.props.id);
    sound.play();
    this.props.updateDisplay(this.props.audioClip);
    this.setButtonActive();
    setTimeout(() => this.setButtonInactive(), 200)
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress(event) {
    if (event.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  setButtonActive() {
    this.setState({
      buttonStyle: activeStyle
    });
  }
  setButtonInactive() {
    this.setState({
      buttonStyle: inActiveStyle
    });
  }
  setButtonOnHover() {
    this.setState({
      buttonStyle: onHoverStyle
    });
  }
  render() {
    return (
      <div>
        <div 
          onMouseDown={this.playSound}
          onMouseOver={this.setButtonOnHover}
          onMouseOut={this.setButtonInactive}
          style={this.state.buttonStyle}
          className="drum-pad"
          id={this.props.audioClip} 
        > {this.props.label}
          <audio className="clip"
            id={this.props.id}
            src={this.props.trackSrc}
          ></audio>
        </div>
      </div>
    );
  }
}

//////////////////////////////////////////// DRUM PAD
class DrumPad extends Component {
  render() {
    let allButtons = this.props.currentSide.map((obj, item, arr) => {
    return (
      <Button 
        id={arr[item].id}
        keyCode={arr[item].keyCode}
        label={arr[item].id}
        audioClip={arr[item].name.replace(/\s/g, "-")}
        trackSrc={arr[item].url}
        updateDisplay={this.props.updateDisplay}
        />
      )
    });
    return (
      <div id="pad">
        {allButtons}
      </div>
    );
  }
}

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
      backgroundStyle: backgroundStyleA,
    }
    this.toggleSide = this.toggleSide.bind(this);
    this.displayClipName = this.displayClipName.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.setButtonActive = this.setButtonActive.bind(this);
    this.setButtonInactive = this.setButtonInactive.bind(this);
    this.setButtonOnHover = this.setButtonOnHover.bind(this);
  }
  toggleSide() {  // TOGGLING SIDES
    this.state.currentSide === sideA ?
    this.setState({
      currentSide: sideB,
      displaySide: "SIDE B",
      backgroundStyle: backgroundStyleB
    }) :
    this.setState({
      currentSide: sideA,
      displaySide: "SIDE A",
      backgroundStyle: backgroundStyleA
    });
    this.setButtonActive();
    setTimeout(() => this.setButtonInactive(), 200);
  }
  displayClipName(name) {
    this.setState({
      currentClip: name
    });
  }
  handleVolumeChange(event) {
    this.setState({
      currentVolume: event.target.value,
      displayVolume: "VOL: " + Math.round(event.target.value*100) + " %"
    });
  }
  setButtonActive() {
    this.setState({
      buttonStyle: activeStyle,
    });
  }
  setButtonInactive() {
    this.setState({
      buttonStyle: inActiveStyle
    });
  }
  setButtonOnHover() {
    this.setState({
      buttonStyle: onHoverStyle
    });
  }

  render() {
    // slider changes are mapped onto all audio elements volume properties
    const clip = [].slice.call(document.getElementsByClassName("clip"));
    clip.map((item) => {
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
              onMouseOut={this.setButtonInactive}>
              {this.state.displaySide}
            </div>
            <div class="display-block">{this.state.currentClip.replace(/-/g," ")}</div>
            <div class="display-block">{this.state.displayVolume}</div>
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
          <span id="side-text">{this.state.displaySide}</span>
        </div>
      </div>
    );
  }
}

export default App;