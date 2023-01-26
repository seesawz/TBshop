import React, { useState } from "react";
import styles from './Header.module.css'
import { Modal } from 'antd';
const Header = () => {
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <div className={styles.head}>
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
      <div className={styles.headertitle}>
        {/*如果没有登录则弹出登录界面*/}
       <div style={{flex:1}}></div>
        <div style={{flex:1,marginLeft:'600px'}}>
          <span onClick={()=>{setModal2Open(true)}}>我的</span>
          <span>购物车</span>
          <span>免费注册</span>
          <span>联系客服</span>
        </div>
      </div>
      <div className={styles.content}>
        <div>
          <img src="src/assets/headerbg1.png" alt="" />
          <span className={styles.bannertitle}>商业办公</span>
          <span className={styles.bannerinfo}>价格真的实惠</span>
        </div>
        <div>
          <img src="src/assets/headerbg2.png" alt="" />
          <span className={styles.bannertitle}>商业办公</span>
          <span className={styles.bannerinfo}>价格真的实惠</span>
        </div>
        <div>
          <img src="src/assets/headerbg3.png" alt="" />
          <span className={styles.bannertitle}>商业办公</span>
          <span className={styles.bannerinfo}>价格真的实惠</span>
        </div>
        <div>
          <img src="src/assets/headerbg4.png" alt="" />
          <span className={styles.bannertitle}>商业办公</span>
          <span className={styles.bannerinfo}>价格真的实惠</span>
        </div>
      </div>
    </div>
  );
};

export default Header;