import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoot } from "@dynatrace/strato-components/core";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app/App";

// Inject Zalando Sans SemiExpanded font
const link = document.createElement("link");
link.href =
  "https://fonts.googleapis.com/css2?family=Zalando+Sans+SemiExpanded:wght@400;500;600;700&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <AppRoot
    style={{
      fontFamily: "'Zalando Sans SemiExpanded', sans‑serif",
    }}
  >
    <BrowserRouter basename="ui">
      <App />
    </BrowserRouter>
  </AppRoot>
);
