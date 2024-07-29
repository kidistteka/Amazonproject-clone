import React, { useState, useContext } from 'react'
import classes from './Signup.module.css'
// import Layout from '../../Components/Layout/Layout'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {auth} from '../../utility/firebase'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import {ClipLoader} from 'react-spinners'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { Type } from '../../utility/action.type'

function Auth() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [ error,setError] = useState("");
   const [loading, setLoading] = useState({
    signIn:false,
    signUp:false
   })

   const [{user}, dispatch] = useContext(DataContext);
   const Navigate = useNavigate();
   const navstateData = useLocation();
   console.log(navstateData);

  //  console.log(user);

   const authHandler = async(e)=> { 
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name=="signin") {
      //firebase auth
      setLoading({...loading,signIn:true})
      signInWithEmailAndPassword(auth,email, password)
      .then((userInfo)=>{
        // console.log(userInfo);
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user
        })
        setLoading({...loading,signIn:false})
        Navigate(navstateData?.state?.redirect ||'/');
      })
      .catch ((err)=>{
       setError(err.message)
       setLoading({...loading,signIn:false})
      });
    }else {
      setLoading({...loading,signUp:true})
      createUserWithEmailAndPassword(auth, email, password)
      .then((userInfo)=> {
        // console.log(userInfo);
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user
        })
        setLoading({...loading,signUp:false})
        Navigate(navstateData?.state?.redirect ||'/');
      })
      .catch((err)=> {
        setError(err.message)
        setLoading({...loading,signUp:false})
      });
    }
   }
  return (
    
     <section className={classes.login}>
      <Link to={"/"}>
       <img src="https://pngimg.com/uploads/amazon/small/amazon_PNG2.png" alt="amazon logo" />
      
      </Link>
    <div className={classes.login_container}>
      <h1>Sign In</h1>
      {navstateData?.state?.msg &&(
        <small
        style={{
          padding:"5px",
          textAlign:"center",
          color:"red",
          fontWeight:"bold",
        }}>
          {navstateData?.state?.msg}
        </small>

      )}
      <form action="">
         <div className={classes}>
             <label htmlFor="email">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)}
             type="email" id="email" />
         </div>
         <div>
          <label htmlFor="password">Password</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} 
          type="password" id="password" />
        </div>
         <button
          type='summit'
          name='signin'
          onClick={authHandler}
          className={classes.login_signInbutton}>
            {loading.signIn ? (
              <ClipLoader color='#000' size={15}></ClipLoader>
            ) :('Sign In')}
             </button>
      </form>
         <p>
           By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.

         </p>
         <button
         type='summit'
         name='signup'
         onClick={authHandler}
         className={classes.login_registerButton}>
           {loading.signUp ? (
              <ClipLoader color='#000' size={15}></ClipLoader>
            ) :(' Create your Amazon Account')}
          </button>
         {error&& <small style={{paddingTop:"5px",color:"red"}}>{error}</small>}
         
    </div>
     </section>
    
  )
}

export default Auth
