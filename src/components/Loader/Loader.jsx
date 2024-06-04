import React from "react";
import "./styles.css";

const Loader = () => {
  return (
    <div
      style={{
        height: "100dvh",
        width: "100%",
        position: "fixed",
        backgroundColor: "rgba(255,255,255,0.5)",
      }}
    >
      <div class="loader">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  );
};

export default Loader;
