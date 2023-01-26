import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Shopinfo from "@/pages/Shopinfo";
import styles from './index.module.css'
const MyRouter = () => (
<div style={{backgroundColor:"#dededd"}} className={styles.bg}>
  <Header></Header>
  <Router>
    <Routes>
      <Route  path={'/'} element={<Shopinfo/>}></Route>
    </Routes>
  </Router>
  <Footer></Footer>
</div>
)
export default MyRouter