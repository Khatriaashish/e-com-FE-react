import ReactDOM from "react-dom/client";
import React from "react";
const root = ReactDOM.createRoot(document.getElementById('root'));
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import "./assets/css/main.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import {Routing} from "./router/routing.conifg";


root.render(<React.StrictMode>
  <Routing/>
</React.StrictMode>
)