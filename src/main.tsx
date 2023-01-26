import React from "react";
import ReactDOM from "react-dom/client";
import ThemeIndex from "./theme";
import { ProThemeProvider } from "./theme/hooks";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    //组件名必须大写，不然会被认为是html标签会爆出实例上不存在
    <ProThemeProvider>
      <ThemeIndex />
    </ProThemeProvider>
  );
