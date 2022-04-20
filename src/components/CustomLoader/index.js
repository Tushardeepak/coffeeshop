import React from "react";
import "./customloader.css";
import SyncLoader from "react-spinners/SyncLoader";

function CustomLoader() {
  return (
    <div className="customLoaderContainer">
      <SyncLoader />
    </div>
  );
}

export default CustomLoader;
