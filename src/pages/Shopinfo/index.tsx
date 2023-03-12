import React, { useEffect, useRef, useState } from "react";
import styles from './index.module.css'
import logo from '@/assets/react.svg'
import { EditOutlined, MenuOutlined } from '@ant-design/icons';
import { Input, Affix, Carousel, Button, Modal } from 'antd';
import { Divider, List, Typography } from 'antd';
import Shopitem from "@/pages/Shopitem";
import Signin from "@/pages/Signin";
import { useproThemeContext } from "@/theme/hooks";

import { getToken } from '@/utils/token'
import { selectPolicy } from "@/api";
import { Page } from "@/utils/type";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState<Page>({
    pageNo: 1,
    pageSize: 4,
    total: 0
  })
  const [contentOpen, seContentOpen] = useState<boolean>(false)
  const [policyContent, setPolicyContent] = useState<string>('')
  const [searchWords, setSearchWords] = useState('')
  const [top, setTop] = useState(10);
  const [policyList, setPolicyList] = useState<any[]>([])
  const [tipWords, setTipWords] = useState<string[]>([
    '新款连衣裙',
    '四件套',
    '潮流体恤',
    '时尚女鞋',
    '女鞋'
  ])
  const [modal2Open, setModal2Open] = useState(false);

  const [token, setToken] = useState<string>('')

  const { isLogin, setIsLogin } = useproThemeContext()!
  const showUserLogin = () => {
    setIsLogin(true)
    setModal2Open(true)
  }
  const showUserLoginForin = () => {
    setIsLogin(false)
    setModal2Open(true)
  }
  useEffect(() => {
    //取推荐词
    setSearchWords(tipWords[Math.round(Math.random() * 4)])
    setToken(getToken() as string)
  }, [])
  const searchShop = (value: string) => {
    //此处是为了判断用户有没有输入
    if(value === ''){
      navigate('/search?searchWord='+searchWords)
    }else{
      navigate('/search?searchWord='+value)
    }
  }
  const contentStyle: React.CSSProperties = {
    height: '330px',
    width: '600px'
  };
  const getPolicy = async () => {
    const result = await selectPolicy(page)
    if (result.code === 0) {
      setPolicyList(result.data.data)
    }
  }
  const showPolicyContent = (policy:any) => {
    seContentOpen(true)
    setTimeout(() => {
      setPolicyContent(policy.content)
    }, 200);
  }
  useEffect(() => {
    getPolicy()
  }, [])
  return (
    <div className={styles.shopinfo}>
      <Modal
        title="政策详情"
        centered
        open={contentOpen}
        footer={null}
        onOk={() => seContentOpen(false)}
        onCancel={() => seContentOpen(false)}
        width={350}
      >
        <div>
          <span>{policyContent}</span>
        </div>
      </Modal>
      <Modal
        title="请先登录"
        centered
        destroyOnClose={true}
        open={modal2Open}
        footer={null}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        width={350}
      >
        <Signin></Signin>
      </Modal>
      <br /><br />
      <header className={styles.header}>
        <Affix offsetTop={top}>
          <div className={styles.search}>
            <div>
              <img src={logo} alt="" />
              <span>&nbsp;&nbsp;农易网</span>
            </div>
            <div style={{ height: '100px' }}>
              <Input.Search
                size="large"
                placeholder={searchWords}
                loading={false}
                enterButton
                onSearch={searchShop}
                style={{ width: '600px', flex: 1, minHeight: '100px', borderRadius: '50px' }}
                prefix={<EditOutlined />} />
              <ul
                className={styles.tipWords}
              >
                {tipWords.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
            <div>

            </div>
          </div>
        </Affix>
      </header>
      <section>
        <div className={styles.nav}>
          <div style={{ flexGrow: '1' }}>
            <div className={styles.navinfo}>
              <br />
              <div >
                <p style={{ marginLeft: '20px' }} className={styles.navtitle}>分类</p>
                <br />
                <ul style={{ listStyle: 'none', justifyContent: 'start' }} className={styles.navlist}>
                  <li className={styles.ulitem}>
                    <MenuOutlined style={{ marginRight: '10px' }} />
                    女装 &nbsp;&nbsp;/ &nbsp;男装&nbsp;&nbsp; /&nbsp;&nbsp;裙子
                  </li>
                  <li className={styles.ulitem}>
                    <MenuOutlined style={{ marginRight: '10px' }} />
                    女鞋 &nbsp;&nbsp;/ &nbsp;男鞋&nbsp;&nbsp; /&nbsp;&nbsp;箱包
                  </li>
                  <li className={styles.ulitem}>
                    <MenuOutlined style={{ marginRight: '10px' }} />
                    美妆 &nbsp;&nbsp;/ &nbsp;饰品&nbsp;&nbsp; /&nbsp;&nbsp;洗护
                  </li>
                  <li className={styles.ulitem}>
                    <MenuOutlined style={{ marginRight: '10px' }} />
                    手机 &nbsp;&nbsp;/ &nbsp;数码&nbsp;&nbsp; /&nbsp;&nbsp;企业用品
                  </li>
                  <li className={styles.ulitem}>
                    <MenuOutlined style={{ marginRight: '10px' }} />
                    女装 &nbsp;&nbsp;/ &nbsp;男装&nbsp;&nbsp; /&nbsp;&nbsp;裙子
                  </li>
                  <li className={styles.ulitem}>
                    <MenuOutlined style={{ marginRight: '10px' }} />
                    女装 &nbsp;&nbsp;/ &nbsp;男装&nbsp;&nbsp; /&nbsp;&nbsp;裙子
                  </li>
                  <li className={styles.ulitem}>
                    <MenuOutlined style={{ marginRight: '10px' }} />
                    女鞋 &nbsp;&nbsp;/ &nbsp;男鞋&nbsp;&nbsp; /&nbsp;&nbsp;箱包
                  </li>
                  <li className={styles.ulitem}>
                    <MenuOutlined style={{ marginRight: '10px' }} />
                    美妆 &nbsp;&nbsp;/ &nbsp;饰品&nbsp;&nbsp; /&nbsp;&nbsp;洗护
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div style={{ flexGrow: '1' }}>
            <div className={styles.navrighttop}>
              <span>聚划算</span>
              <span>|</span>
              <span>鸡蛋</span>
              <span>|</span>
              <span>梁山鸡</span>
              <span>|</span>
              <span>聚划算</span>
              <span>|</span>
              <span>鸡蛋</span>
              <span>|</span>
              <span>梁山鸡</span>
              <span>|</span>
              <span>鸡蛋</span>
              <span>|</span>
              <span>助农直播</span>
            </div>
            <div className={styles.slidercontent}>
              <div style={{ flexGrow: '1.5' }}>
                <div className={styles.carsour}>
                  <Carousel autoplay>
                    <div>
                      <img style={contentStyle} src="src/assets/1.jpeg" alt="" />
                    </div>
                    <div>
                      <img style={contentStyle} src="src/assets/2.jpeg" alt="" />
                    </div>
                    <div>
                      <img style={contentStyle} src="src/assets/3.jpeg" alt="" />
                    </div>
                    <div>
                      <img style={contentStyle} src="src/assets/4.jpeg" alt="" />
                    </div>
                  </Carousel>
                </div>
              </div>
              {token?.length === 0 ? <div style={{ flexGrow: '1' }} className={styles.logininfo}>
                <p>Hi 你好</p>
                <br />
                <br /><br />
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <Button size="large" type="primary" danger onClick={showUserLogin}>登录</Button>
                  <Button size="large" type="primary" danger onClick={showUserLoginForin}>注册</Button>
                </div>
              </div> :
                <div className="w-60 mt-0 cursor-pointer -ml-20">
                  <Divider orientation="left" ><span className="color-rose-400">惠民政策</span></Divider>
                  <List
                    size="large"
                    bordered
                    dataSource={policyList}
                    renderItem={(policyList) => (
                      <List.Item onClick={() => showPolicyContent(policyList)} key={policyList.id}>{policyList.title}</List.Item>
                    )
                    }
                  />
                </div>
              }
            </div>
          </div>
        </div>
      </section>
      <br /><br />
      <br /><br />
      <br /><br />
      <div className={styles.shopitem} >
        <Shopitem></Shopitem>
      </div>
    </div>
  );
};

export default Index;