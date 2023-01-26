import React from "react";
//引入加载组件
import { Spin } from "antd";
//引入加载的icon
import { LoadingOutlined } from "@ant-design/icons";

type tip = {
  tip: string;
};

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const Loading = ({ tip = "Loading" }: tip) => (
  <Spin indicator={antIcon} tip={tip} />
);

export default Loading;
