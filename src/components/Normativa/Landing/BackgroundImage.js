import React from "react";

function BackgroundImage ({ src, ...otherProps })  {
    return (
      <div className="background-image" {...otherProps}>
      </div>
    );
  };

export default BackgroundImage