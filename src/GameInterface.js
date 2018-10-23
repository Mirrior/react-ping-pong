import React, { Component } from "react";

import GameCanvas from "./components/GameCanvas";
import GameControls from "./components/GameControls";

class GameInterface extends Component {
  constructor() {
    super();
    this.state = { winScore: 5 };
    this.child = React.createRef();
  }

  onSubmit = event => {
    event.preventDefault();
    this.child.current._initializeGameCanvas();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <main
        style={{
          width: "100vw",
          height: "100vh",
          background: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <GameCanvas settings={this.state} ref={this.child} />
          <form>
            <GameControls settings={this.state} onChange={this.handleChange} />
            <input type="submit" value="Start Game" onClick={this.onSubmit} />
          </form>
        </section>
      </main>
    );
  }
}

export default GameInterface;
