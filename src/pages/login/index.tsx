import LoginForm from "./LoginForm/login";
import React from "react";
import loginLeft from "@/assets/images/login_left2.png";
import logo from "@/assets/images/logo.png";
import "./index.less";

const Login = () => {
	return (
		<div className="login-container">
			<div className="login-box">
				<div className="login-left">
					<img src={loginLeft} alt="login" />
				</div>
				<div className="login-form  shadow-xl w-xl">
					<div className="login-logo">
						{/* <img className="login-icon" src={logo} alt="logo" /> */}
						<span className="logo-text">农易助农网</span>
					</div>
					<div className="ml-14">
					<LoginForm  />
					</div>
				</div>
			</div>
		</div>
	)
};

export default Login;
