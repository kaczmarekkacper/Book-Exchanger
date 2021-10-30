import React from "react";

import ControlBar from "../ControlBar";

const LayoutWithControlBar = (props) => {
  return (
    <>
      {props.children}
      <ControlBar />
    </>
  );
};

export default LayoutWithControlBar;
