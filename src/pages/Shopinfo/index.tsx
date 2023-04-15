import React, { useEffect, useState } from "react";
import styles from './index.module.css'
import logo from '@/assets/react.svg'
import { EditOutlined } from '@ant-design/icons';
import { Input, Affix, Carousel, Button, Modal,AutoComplete,Pagination } from 'antd';
import { Divider, List } from 'antd';
import img1 from '@/assets/1.jpeg'
import img2 from '@/assets/2.jpeg'
import img3 from '@/assets/3.jpeg'
import img4 from '@/assets/4.jpeg'
import Shopitem from "@/pages/Shopitem";
import { useproThemeContext } from "@/theme/hooks";

import { getToken } from '@/utils/token'
import { getHistorySearch, saveHistoryRecord, selectAllGoodsCategory, selectPolicy } from "@/api";
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
  const [classification,setClassification] = useState<any[]>([])
  const [modal2Open, setModal2Open] = useState(false);

  const [token, setToken] = useState<string>('')

  const {  setIsLogin } = useproThemeContext()!
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const showUserLogin = () => {
    setIsLogin(true)
    setModal2Open(true)
  }

  const showUserLoginForin = () => {
    setIsLogin(false)
    setModal2Open(true)
  }

  const getHistoryRecord = async () => {
    const result = await getHistorySearch()
    if (result.code === 0){
      const arr = result.data.map((item:any) => {
        return {value:item}
      })
      setOptions(arr)
      }
    }

  useEffect(() => {
    //取推荐词
    setSearchWords(tipWords[Math.round(Math.random() * 4)])
    setToken(getToken() as string)
  }, [])

    //查询搜索的历史记录
   useEffect(()=>{
     getHistoryRecord()
   },[])
  const searchShop = (value: string) => {
    //此处是为了判断用户有没有输入
    if(value === ''){
         navigate('/search?searchWord='+searchWords)
    }else{
      saveHistoryRecord({key:'history',value}).then(res => {
        if (res.code === 0) {
          navigate('/search?searchWord=' + value)
        }
      }).catch(err=>{
        console.log(err)})
    }
  }
  const searchTip = (tip:string) => {
    navigate('/search?searchWord='+tip)
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

  //查询分类
  const getClassification = async() => {
      const result = await selectAllGoodsCategory({})
      if(result.code === 0){
        setClassification(result.data.data)
      }

  }
  useEffect(() => {
    getPolicy()
    getClassification()
  }, [])
  return (
    <div className="bg-#E7E2E0">
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
      <br /><br />
      <header className={styles.header}>
        <Affix offsetTop={top}>
          <div className={styles.search}>
            <div>
              <img
              className="w-10 h-10"
              src='https://its.uiowa.edu/sites/its.uiowa.edu/files/styles/ic_logo/public/infocenter/logos/icon10_logo.png?itok=kriT_Oh1' alt="" />
              <span>&nbsp;&nbsp;农易网</span>
            </div>
            <div style={{ height: '100px' }}>
              <AutoComplete
                options={options}
              >
              <Input.Search
                size="large"
                placeholder={searchWords}
                loading={false}
                enterButton
                onSearch={searchShop}
                style={{ width: '600px', flex: 1, borderRadius: '50px' }}
                prefix={<EditOutlined />} />
              </AutoComplete>
              <ul
                className={styles.tipWords}
              >
                {tipWords.map((item, idx) => <li onClick={()=>searchTip(item)} key={idx}>{item}</li>)}
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
               <div className="flex justify-evenly flex-wrap">
               {classification && classification.map((item:any) => {
                  return (
                    <span onClick={()=>searchShop(item.name)} key={item.id} className="color-gray-500 w-20 mt-4 text-sm ml-2 hover-color-orange cursor-pointer">/{item.name}</span>
                  )
                })}
               </div>
               <Pagination className="mt-25 ml-20" size="small"  defaultCurrent={1} total={50} simple={true}/>
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
              <span>助农商品</span>
            </div>
            <div className={styles.slidercontent}>
              <div style={{ flexGrow: '1.5' }}>
                <div className={styles.carsour}>
                  <Carousel autoplay>
                    <div>
                      <img style={contentStyle} src={img1}  alt="" />
                    </div>
                    <div>
                      <img style={contentStyle} src={img2} alt="" />
                    </div>
                    <div>
                      <img style={contentStyle} src={img3}alt="" />
                    </div>
                    <div>
                      <img style={contentStyle} src={img4} alt="" />
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
                <div className="w-60 mt-0 cursor-pointer -ml-35 overflow-hidden">
                  <Divider orientation="left" ><span className="color-rose-400">惠民政策</span></Divider>
                  <List
                    size="large"
                    bordered
                    dataSource={policyList}
                    renderItem={(policy,idx) => (
                      <List.Item 
                      onClick={() => showPolicyContent(policy)} 
                      className={idx === policyList.length -1 ?styles.animate :''}
                      style={{display: idx < 4 ? '' : 'none'}}
                      key={policy.id}>
                      {policy.title}</List.Item>
                    )
                    }
                  />
               <Pagination className="mt-5 ml-25" size="small"  defaultCurrent={1} total={50} simple={true}/>
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
    </div>
  );
};

export default Index;
