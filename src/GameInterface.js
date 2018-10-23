import React, { Component } from "react";

import GameCanvas from "./components/GameCanvas";
import GameControls from "./components/GameControls";

class GameInterface extends Component {
  constructor() {
    super();
    this.state = {
      winScore: 5,
      ballVelocityX: 1,
      ballVelocityY: 1,
      ballInitialVelocity: 1,
      paddle1Color: "#FFF",
      paddle2Color: "#FFF",
      ballColor: "#F00"
    };
    this.child = React.createRef();
  }

  onSubmit = event => {
    event.preventDefault();
    this.child.current._initializeGameCanvas();
  };

  handleChange = event => {
    if (event.target.name === "ballInitialVelocity") {
      if (event.target.value > 1) {
        this.setState({
          ballVelocityX: Number(event.target.value > 3 ? 3 : event.target.value)
        });
        this.setState({
          ballVelocityY: Number(event.target.value > 3 ? 3 : event.target.value)
        });
      } else {
        this.setState({ ballVelocityX: 1 });
        this.setState({ ballVelocityY: 1 });
      }
    }
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
