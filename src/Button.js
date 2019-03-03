import React, { Component } from 'react';
import {
  activeStyle,
  inactiveStyle,
  onHoverStyle
} from './helpers';

// var classNames = require('classnames');

export const TIMEOUT = 200; // pressed button goes back to default style after this time in ms

export const styleMapping = {
  'active': activeStyle,
  'inactive': inactiveStyle,
  'onHover': onHoverStyle
}

export default class Button extends Component {
  state = {
    btnState: 'inactive'
  }
  playSound = () => {
    const { id, audioClip, updateDisplay } = this.props;
    var sound = document.getElementById(id);
    sound.play();
    updateDisplay(audioClip);
    this.setButtonActive();
    setTimeout(() => this.setButtonInactive(), TIMEOUT)
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress = (event) => {
    if (event.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  setButtonActive = () => {
    this.setState({
      btnState: 'active'
    });
  }
  setButtonInactive = () => {
    this.setState({
      btnState: 'inactive'
    });
  }
  setButtonOnHover = () => {
    this.setState({
      btnState: 'onHover'
    });
  }
    /*
  const { btnState } = this.state
  className={classNames('drum-pad', {
      ['drum-pad--active']: btnState === 'active',
      ['drum-pad--inActive']: btnState === 'inActive',
      ['drum-pad--onHover']: btnState === 'onHover',
  })}
  
  const { btnState } = this.state
  className={classNames('drum-pad', `drum-pad--${btnState}`)}
  */


  render() {
    const { btnState } = this.state;
    const { audioClip, label, id, trackSrc} = this.props;
    return (
      <div>
        <div 
          onMouseDown={this.playSound}
          onMouseOver={this.setButtonOnHover}
          onMouseOut={this.setButtonInactive}
          style={styleMapping[btnState]}
          className="drum-pad"
          id={audioClip} 
        > {label}
          <audio className="clip"
            id={id}
            src={trackSrc}
          ></audio>
        </div>
      </div>
    );
  }
}