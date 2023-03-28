import LoginForm from "./LoginForm/login";
import React, { useState } from "react";
import loginLeft from "@/assets/images/login_left2.png";
import "./index.less";
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useproThemeContext } from "@/theme/hooks";
const Login = () => {
	const [phoneT,setPhoneT] = useState<boolean>(false)
	const {setIsLogin} = useproThemeContext()!
	const items: TabsProps['items'] = [
        {
          key: '1',
          label: `账号登录`
        },
        {
          key: '2',
          label: `手机登陆`,
        },
      ]  
	const onChange = (key: string) => {
		if(key === '2'){
			setPhoneT(true)
		}else{
			setIsLogin(true)
			setPhoneT(false)
		}
	}
	return (
		<div className="login-container">
			<div className="login-box">
				<div className="login-left">
					<img src={loginLeft} alt="login" />
				</div>
				<div className="login-form  shadow-xl w-xl">
					<div className="login-logo">
						{/* <img className="login-icon" src={logo} alt="logo" /> */}
						<Tabs defaultActiveKey="1" items={items} onChange={onChange} />
					</div>
					<div className="ml-14">
					<LoginForm  phoneT={phoneT}/>
					</div>
				</div>
			</div>
		</div>
	)
};

export default Login;
