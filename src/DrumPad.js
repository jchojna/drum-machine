import React, { Component } from "react";

import Button from "./Button";

/////////////////////////////////////////// DRUM PAD
export default class DrumPad extends Component {
  render() {
    const { currentSide, updateDisplay } = this.props;
    const allButtons = currentSide.map((obj, item, arr) => {
      const t = arr[item];
      if (!t) {
        return null;
      }
      const { id, keyCode, name, url } = t;
      return (
        <Button
          id={id}
          keyCode={keyCode}
          label={id}
          audioClip={name.replace(/\s/g, "-")}
          trackSrc={url}
          updateDisplay={updateDisplay}
        />
      );
    });
    return <div id="pad">{allButtons}</div>;
  }
}
