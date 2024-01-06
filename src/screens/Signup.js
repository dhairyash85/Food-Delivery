import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        location:""
    })
    const handleChange=(event)=>{
        setFormData({...formData,[event.target.name]: event.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const response=await fetch("http://localhost:4000/api/createuser",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:formData.name,
                email:formData.email,
                password:formData.password,
                location:formData.location
            })
        })
        const json = await response.json()
        console.log(json)
        if (!json.success){
            alert("Enter Valid")
        }
    }
  return (
    <>
      <Navbar />
      <div className="container m-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              name='name' 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input 
              type="text" 
              className="form-control" 
              id="location" 
              name='location' 
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">Already a User? Login</Link>
        </form>
      </div>
    </>
  );
}
