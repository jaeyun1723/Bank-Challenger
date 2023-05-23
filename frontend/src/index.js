import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./App";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss?v1.1.0";

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(<App />);
