import { ConfigProvider, theme } from "antd";
import React from "react";
import { useproThemeContext } from "./theme/hooks";
import myThemes from "./theme/index";
import { StyleProvider } from "@ant-design/cssinjs";
import "antd/dist/reset.css";
import MyRouter from "@/router";
const themeIndex = () => {
  const { myTheme } = useproThemeContext() as any;
  return (
    //主题配置
    <StyleProvider hashPriority="high">
      <ConfigProvider
        theme={{
          algorithm:
            myTheme === "light"
              ? [theme.defaultAlgorithm, theme.compactAlgorithm]
              : [theme.darkAlgorithm, theme.compactAlgorithm],
          token: myTheme === "light" ? myThemes.lightTheme : myThemes.darkTheme,
        }}
        componentSize="middle"
        input={{ autoComplete: "off" }}
      >
        {/* 路由 */}
        <MyRouter
        ></MyRouter>
      </ConfigProvider>
    </StyleProvider>
  );
};
export default themeIndex;
