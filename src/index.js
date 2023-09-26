import React from "react";
import ReactDOM from "react-dom/client";
import ReactModal from "react-modal"
import Test from "./components/Test";

import AppPlan3 from "./AppPlan3";
import { NavigationProvider } from './context/navigation';

ReactModal.setAppElement('#root');
const root  = ReactDOM.createRoot(document.getElementById("root"));
root.render(<NavigationProvider> <AppPlan3 /> </NavigationProvider>) ;
// root.render(<NavigationProvider> <Test /> </NavigationProvider>) ;