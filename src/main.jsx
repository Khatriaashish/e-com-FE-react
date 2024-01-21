import ReactDOM from "react-dom/client";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import "./assets/css/main.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { Routing } from "./router/routing.conifg";
import ThemeProvider from "./config/theme.context";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<React.StrictMode>
  <ThemeProvider>
    <Routing />
  </ThemeProvider>
</React.StrictMode>
)