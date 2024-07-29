import React, { useContext } from 'react';
import classes from  './Header.module.css';
import {Link} from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { BsCart3 } from "react-icons/bs";
import LowerHeader from './LowerHeader';
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../utility/firebase';


function Header() {
  const[ {user,basket},dispatch]=useContext(DataContext)
  const totalItem =basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)
  return (
    < section className={classes.fixed}>
        <div className={classes.header_container}>
            <div className={classes.logo_container}>
                <Link to="/">
                    <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
                </Link >
                <span>
                  <GoLocation/>
                </span>
                <div className={classes.delivery}>
                    <p> Delivered to </p>
                    <span>Ethiopia</span>
                </div>
            </div>
        <div/>
        <div className={classes.search}>
           <select name="" id="">
                    <option value="">All</option>
                </select>
                <input type="text" name='' id='' placeholder='search product' />
                < FaSearch size={38}/>
       </div>
       <div className={classes.order_container}>
            <Link to="" className={ classes.language}>
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/255px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"alt="flag" />
             <select name="" id="">
                 <option value="">EN</option>
             </select>
            </Link >
            <Link to={!user&&"/Auth"}>
            <div>
              {user ?(
               <>
                 <p>Hello {user?.email?.split("@")[0]}</p>
                 <span onClick={()=>auth.signOut()}>Sign Out</span>
               </>
              
              ):( 
               <>
                  <p>Hello,Sign In</p>
                  <span>Account & Lists</span>
               </>
              )}
            </div>
            </Link >
            <Link to="/orders">
             <p>returns</p>
             <span>& orders</span>
            </Link >
            <Link to="/cart" className={classes.cart}>
              <BsCart3 size={35}/>
                <span>{totalItem}</span>
             </Link >
            </div>
        </div>
        <LowerHeader/>
    </section>
  )
}

export default Header
