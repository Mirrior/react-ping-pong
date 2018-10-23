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
    </article>
  );
};

export default GameControls;
