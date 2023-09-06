import React from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal"

import App from "./components/App";

ReactModal.setAppElement('#root');
ReactDOM.render(<App />,    document.getElementById("root")) ;