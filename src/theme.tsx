import { ConfigProvider, theme, message } from "antd";
import React from "react";
import { useproThemeContext } from "./theme/hooks";
import myThemes from "./theme/index";
import { StyleProvider } from "@ant-design/cssinjs";
import type { NoticeType } from "antd/es/message/interface";

const themeIndex = () => {
  const { myTheme } = useproThemeContext() as any;
  const [messageApi, contextHolder] = message.useMessage()
  const info = (type:NoticeType,msg:string) => {
    messageApi.open({
      type,
      content:msg
    })
  }
  return (
    <>
  {/*  {contextHolder}
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
      </ConfigProvider>
    </StyleProvider> */}
    </>
  );
};
export default themeIndex;
