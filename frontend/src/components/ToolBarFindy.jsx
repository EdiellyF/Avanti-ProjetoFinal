import React from "react";
import "./../styles/ToolBarFindy.css";
import LogoFindy from "../assets/logoFindy.png";

function ToolBarFindy() {
  return (
    <div className="toolbar">
      <div className="toolbar-logo">
        <img src={LogoFindy} alt="Logo Findy" />
        <span className="toolbar-logo-text"></span>
      </div>
      <div className="toolbar-buttons">
      </div>
    </div>
  );
}

export default ToolBarFindy;