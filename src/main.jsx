import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/tanstack-query.js";
import pmTheme from "./config/antd.theme.js"
import trTr from "antd/locale/tr_TR";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={pmTheme} locale={trTr}>
        <App />
        </ConfigProvider>
      </QueryClientProvider>
    </React.StrictMode>
);
