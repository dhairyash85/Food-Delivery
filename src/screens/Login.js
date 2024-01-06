import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import { Link,  useNavigate} from "react-router-dom";
export default function Login() {
  const [formData, setFormData] = useState({
      email: "",
      password: ""
  })
  let navigate=useNavigate()
  const handleChange=(event)=>{
      setFormData({...formData,[event.target.name]: event.target.value})
  }
  const handleSubmit=async(e)=>{
      e.preventDefault()
      const response=await fetch("http://localhost:4000/api/login",{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              email:formData.email,
              password:formData.password
          })
      })
      const json = await response.json()
      console.log(json)
      if (!json.success){
          alert("Enter Valid")
      }
      if(json.success){
        localStorage.setItem("authTokem", json.authToken)
        console.log(localStorage.getItem('authToken'))
        navigate("/")
      }
  }
  return (
    <>
      <Navbar />
      <div className="container m-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name='email' 
              value={formData.email}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name='password' 
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Login
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">Not a user? Sign-Up</Link>
        </form>
      </div>
    </>
  )
}
