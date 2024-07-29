import React, { useState } from "react"
import {Link,useNavigate} from 'react-router-dom'
import M from 'materialize-css'
import '../../App.css'
const SignUp=()=>{
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const postData = () => {
        fetch("/signUp",{
            method:'post',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({name:name,password:password,email:email})
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                M.toast({html: data.error, classes: 'square #d32f2f red darken-2'});
            } else {
                M.toast({html: data.message, classes: 'square #66bb6a green lighten-1'});
                navigate('/login')
            }
        }).catch(err=> console.log(err))
    }

    return (
        <div className="login">
            <div className="auth-card card">
                <h2 className="brand-logo">XPosts</h2>
                <input 
                type='text' 
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}/>
                <input type='text' placeholder="Email" value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
                <input type='password' placeholder="Password" value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
                <button type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                 focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg 
                 text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>postData()}>Sign Up</button>
                <h5><Link to="/login"> Already have an account?</Link></h5>
            </div>
       </div>
    )
}

export default SignUp