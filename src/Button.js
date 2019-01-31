import React, { Component } from "react";

import { inActiveStyle, activeStyle, onHoverStyle } from "./helpers";

const TIMEOUT_XXX = 200

const styleMapping = {
    'active': activeStyle,
    'inActive': inActiveStyle,
    'onHover': onHoverStyle,
}
/*
const ob1 = {
    a: {
        a1: 5
    },
    b: 6,
}

const { a: { a1 }, b, c = 7 } = ob1
console.log(a1, b, c)

const tab1 = [1, 2, 3]
const [ poz1, ...rest ] = tab1*/

//////////////////////////////////////////// BUTTON
export default class Button extends Component {
  state = {
    btnState: 'active'
  };
  playSound = () => {
    const { id, audioClip, updateDisplay } = this.props
    const sound = document.getElementById(id);
    sound.play();
    updateDisplay(audioClip);
    this.setButtonActive();
    setTimeout(() => this.setButtonInactive(), TIMEOUT_XXX);
    // clearTimeout(timeoutId)
  };
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress = event => {
    if (event.keyCode === this.props.keyCode) {
      this.playSound();
    }
  };
  setButtonActive = () => {
    this.setState({
        btnState: 'active'
    });
  };
  setButtonInactive = () => {
    this.setState({
        btnState: 'inActive'
    });
  };
  setButtonOnHover = () => {
    this.setState({
        btnState: 'onHover'
    });
  };
  /*
  const { btnState } = this.state
  className={classNames('drum-pad', {
      ['drum-pad--active']: btnState === 'active',
      ['drum-pad--inActive']: btnState === 'inActive',
      ['drum-pad--onHover']: btnState === 'onHover',
  })}
  */
 /*
  const { btnState } = this.state
  className={classNames('drum-pad', `drum-pad--${btnState}`)}
  */
  render() {
    const { btnState } = this.state
    const { audioClip, label, id, trackSrc } = this.props
    return (
      <div>
        <div
          onMouseDown={this.playSound}
          onMouseOver={this.setButtonOnHover}
          onMouseOut={this.setButtonInactive}
          style={styleMapping[btnState]}
          className="drum-pad"
          id={audioClip}
        >
          {" "}
          {label}
          <audio
            className="clip"
            id={id}
            src={trackSrc}
          />
        </div>
      </div>
    );
  }
}
