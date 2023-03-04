import React from "react";
import ReactDOM from "react-dom/client";
import { ProThemeProvider } from "./theme/hooks";
import router from "./router";
import "antd/dist/reset.css";
import 'uno.css'
import {
  RouterProvider,
} from 'react-router-dom'
import { persistor, store } from '@/store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    //组件名必须大写，不然会被认为是html标签会爆出实例上不存在
   <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
     <ProThemeProvider>
      <RouterProvider fallbackElement={"/"} router={router}>
      </RouterProvider>
    </ProThemeProvider>
    </PersistGate>
</Provider>
)
