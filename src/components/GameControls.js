import React from "react";

const GameControls = props => {
  return (
    <article>
      <label>
        Win Score:
        <input
          type="number"
          name="winScore"
          placeholder="Win Score"
          min="3"
          value={props.settings.winScore}
          onChange={props.onChange}
        />
      </label>
      <label>
        Ball Initail Speed:
        <input
          type="number"
          name="ballInitialVelocity"
          min="1"
          max="3"
          value={props.settings.ballInitialVelocity}
          onChange={props.onChange}
        />
      </label>
      <label>
        Player 1 Color:
        <input
          type="color"
          name="paddle1Color"
          placeholder="Player 1 Color"
          value={props.settings.paddle1Color}
          onChange={props.onChange}
        />
      </label>
      <label>
        Player 2 Color:
        <input
          type="color"
          name="paddle2Color"
          placeholder="Player 2 Color"
          value={props.settings.paddle2Color}
          onChange={props.onChange}
        />
      </label>
      <label>
        Ball Color:
        <input
          type="color"
          name="ballColor"
          placeholder="Ball Color"
          value={props.settings.ballColor}
          onChange={props.onChange}
        />
      </label>
      <label>
        Ball Shape:
        <select name="ballShape" onChange={props.onChange}>
          <option value="square">Square</option>
          <option value="circle">Circle</option>
        </select>
      </label>
    </article>
  );
};

export default GameControls;
