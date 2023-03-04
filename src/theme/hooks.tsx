import React, { createContext, useContext, useState } from "react";
//此组件作为颜色切换的组件

const defaultTheme = "light";
//定义context的类型
type ContextType = {
  myTheme: string;
  setMyTheme: (theme:string)=>void,
  //此处是为了做登录按钮登录态的处理
  isLogin : boolean,
  setIsLogin :(status:boolean)=>void
  //登录模态框的隐藏处理
  isLoginShow:boolean,
  setLoginShow:(status:boolean)=>void 
  //全局用户信息
  userInfo:any,
  setUserInfo:(userInfo:any)=>void

};

//定义主题context
const ProThemeContext = createContext<ContextType | null>(null);

//使用useContext向子组件提供主题值
const useproThemeContext = () => useContext(ProThemeContext);

//解构children(暂时没明白这里的意思)
const ProThemeProvider = ({ children }: any) => {
  //const [theme, setTheme] = useState<string>('light')
  //等同于
  const [myTheme, setMyTheme] = useState(defaultTheme);
  const [isLogin,setIsLogin] = useState(true)
  const [isLoginShow,setLoginShow]=useState(false)
  const [userInfo,setUserInfo]=useState({})
  return (
    <ProThemeContext.Provider
      value={{
        myTheme,
        setMyTheme,
        isLogin,
        setIsLogin,
        isLoginShow,
        setLoginShow,
        userInfo,
        setUserInfo
      }}
    >
      {children}
    </ProThemeContext.Provider>
  );
};

export { ProThemeProvider, useproThemeContext };
