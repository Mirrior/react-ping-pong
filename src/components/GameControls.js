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
    </article>
  );
};

export default GameControls;
