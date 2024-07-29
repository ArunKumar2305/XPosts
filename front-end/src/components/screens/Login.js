import React, { useState,useContext} from "react"
import {Link,useNavigate} from 'react-router-dom'
import { UserContext } from "../../App"
import M from 'materialize-css'
import '../../App.css'

const LogIn= () =>{
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    
    const postData = () => {
        fetch("/signIn",{
            method:'post',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({password:password,email:email})
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                M.toast({html: data.error, classes: 'square #d32f2f red darken-2'});
            } else {
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: 'signed In successfully', classes: 'square #66bb6a green lighten-1'});
                navigate('/')
            }
        }).catch(err=> console.log(err))
    }
    return (       
       <div className="login">
            <div className="auth-card card input-field">
                <h1 className="brand-logo">XPosts</h1>
                <input type='text' placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                
                <input type='password' placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                 focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg 
                 text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>postData()}>LogIn</button>
                
                <h5><Link to="/signUp">Don't have an account?</Link></h5>
            </div>
       </div>
    )
}

export default LogIn