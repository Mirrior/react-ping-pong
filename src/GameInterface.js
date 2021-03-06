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
      ballColor: "#F00",
      ballShape: "square",
      ballHeight: 15,
      ballWidth: 15,
      paddle1Color: "#FFF",
      paddle1Width: 15,
      paddle1Height: 80,
      paddle1VelocityY: 2,
      paddle2Width: 15,
      paddle2Height: 80,
      paddle2Color: "#FFF",
      paddle2VelocityY: 2,
      paddleInitialVelocityY: 2,
      serverRules: false,
      tempBallVelocityX: null,
      tempBallVelocityY: null,
      tempBallColor: null,
      tempBallHeight: null,
      tempBallWidth: null,
      tempPaddle1Color: null,
      tempPaddle1Width: null,
      tempPaddle1Height: null,
      tempPaddle1VelocityY: null,
      tempPaddle2Width: null,
      tempPaddle2Height: null,
      tempPaddle2Color: null,
      tempPaddle2VelocityY: null
    };

    this.child = React.createRef();
    this.serverRequest = this.serverRequest.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.ballOutOfBounds = this.ballOutOfBounds.bind(this);
  }

  onSubmit = event => {
    event.preventDefault();
    this.child.current._initializeGameCanvas();
    this.serverRequest();
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
    } else if (event.target.name === "paddleInitialVelocityY") {
      if (event.target.value > 1) {
        this.setState({
          paddle1VelocityY: Number(
            event.target.value > 10 ? 10 : event.target.value
          )
        });
        this.setState({
          paddle2VelocityY: Number(
            event.target.value > 10 ? 10 : event.target.value
          )
        });
      } else {
        this.setState({ paddle1VelocityY: 1 });
        this.setState({ paddle2VelocityY: 1 });
      }
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  serverRequest() {
    fetch("https://wwwforms.suralink.com/pong.php?accessToken=pingPONG")
      .then(res => res.json())
      .then(result => {
        this.handleUpdate(result);
      });
    this.setState({ serverRules: true });
  }

  ballOutOfBounds = () => {
    this.setState({ serverRules: false });
    this.setState({ tempBallVelocityX: null });
    this.setState({ tempBallVelocityY: null });
    this.setState({ tempBallColor: null });
    this.setState({ tempBallHeight: null });
    this.setState({ tempBallWidth: null });
    this.setState({ tempPaddle1Color: null });
    this.setState({ tempPaddle1Width: null });
    this.setState({ tempPaddle1Height: null });
    this.setState({ tempPaddle1VelocityY: null });
    this.setState({ tempPaddle2Width: null });
    this.setState({ tempPaddle2Height: null });
    this.setState({ tempPaddle2Color: null });
    this.setState({ tempPaddle2VelocityY: null });
  };

  handleUpdate = data => {
    if (typeof data.gameData.ball === "object") {
      for (var key in data.gameData.ball) {
        var values = data.gameData.ball;
        if (key === "width") {
          this.setState({ tempBallWidth: Number(values.width) });
        } else if (key === "height") {
          this.setState({ tempBallHeight: Number(values.height) });
        } else if (key === "color") {
          this.setState({ tempBallColor: "#" + values.color.hex });
        } else if (key === "velocityX") {
          this.setState({ tempBallVelocityX: Number(values.velocityX) });
        } else if (key === "velocityY") {
          this.setState({ tempBallVelocityY: Number(values.velocityY) });
        }
      }
    }
    if (typeof data.gameData.paddle1 === "object") {
      for (var key in data.gameData.paddle1) {
        var values = data.gameData.paddle1;
        if (key === "width") {
          this.setState({ tempPaddle1Width: Number(values.width) });
        } else if (key === "height") {
          this.setState({ tempPaddle1Height: Number(values.height) });
        } else if (key === "color") {
          this.setState({
            tempPaddle1Color: "#" + values.color.hex
          });
        } else if (key === "velocityY") {
          this.setState({ tempPaddle1VelocityY: Number(values.velocityY) });
        }
      }
    }
    if (typeof data.gameData.paddle2 === "object") {
      for (var key in data.gameData.paddle2) {
        var values = data.gameData.paddle2;
        if (key === "width") {
          this.setState({ tempPaddle2Width: Number(values.width) });
        } else if (key === "height") {
          this.setState({ tempPaddle2Height: Number(values.height) });
        } else if (key === "color") {
          this.setState({
            tempPaddle2Color: "#" + values.color.hex
          });
        } else if (key === "velocityY") {
          this.setState({ tempPaddle2VelocityY: Number(values.velocityY) });
        }
      }
    }
    setTimeout(this.serverRequest, data.gameData.newDelay);
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
          <GameCanvas
            settings={this.state}
            ref={this.child}
            outOfBounds={this.ballOutOfBounds}
          />
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
