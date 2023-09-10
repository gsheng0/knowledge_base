import React from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal"

import App from "./components/App";
// import Test from "./components/Test";

ReactModal.setAppElement('#root');
ReactDOM.render(<App />,    document.getElementById("root")) ;