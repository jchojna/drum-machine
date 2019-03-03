import React, { Component } from 'react';
import Button from './Button';

export default class DrumPad extends Component {
  render() {
    const { currentSide, updateDisplay } = this.props;
    const allButtons = currentSide.map((obj, item, arr) => {
      const elem = arr[item];

      if (!elem) { return null; }
      
      const { id, keyCode, name, url } = elem;
      return (
        <Button 
          id={id}
          keyCode={keyCode}
          label={id}
          audioClip={name.replace(/\s/g, "-")}
          trackSrc={url}
          updateDisplay={updateDisplay}
        />
      )
    });
    return (
      <div id="pad">{allButtons}</div>
    );
  }
}