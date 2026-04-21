import React, { useState } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import { Link, useNavigate } from 'react-router-dom'
import FormValidator from "../Validators/FormValidator"

export default function SignupPage() {
  let [data, setData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    cpassword: "",
    consent: false
  })

  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mandatory",
    email: "email Field is Mandatory",
    username: "Usename Field is Mandatory",
    phone: "Phone Field is Mandatory",
    password: "Password Field is Mandatory",
    consent: "Please give your consent for login"
  })

  let navigate = useNavigate()
  let [show, setShow] = useState(false)

  function getInputData(e) {
    var { name, value } = e.target
    setErrorMessage(old => {
      return {
        ...old,
        [name]: name === "consent" ? (data.consent === false ? "" : "Please give your consent for login") : FormValidator(e)
      }
    })
    setData(old => {
      return {
        ...old,
        [name]: name === "consent" ? !data.consent : value
      }
    })
  }

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else if (data.password !== data.cpassword) {
      setShow(true)
      setErrorMessage(old => {
        return {
          ...old,
          'password': "Password and Confirm Password is not Matched"
        }
      })
    }
    else {
      let response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/user`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      let item = response.find(x => x.username?.toLocaleLowerCase() === data?.username?.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data?.email?.toLocaleLowerCase())
      if (item) {
        setShow(true)
        setErrorMessage(old => {
          return {
            ...old,
            'username': item.username?.toLocaleLowerCase() === data?.username.toLocaleLowerCase() ? "Username Already Taken" : "",
            'email': item.email?.toLocaleLowerCase() === data?.email.toLocaleLowerCase() ? "Email Address Already Taken" : ""
          }
        })
      }
      else {
        response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/user`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            name: data.name,
            username: data.username,
            phone: data.phone,
            email: data.email,
            password: data.password,
            role: "Buyer",
            active: true
          })
        })
        response = await response.json()
        navigate("/login")
      }
    }
  }


  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrumb title="Create New Account" />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-8 col-xl-7 col-xxl-7 mx-auto">
                <div className="card rounded-0">
                  <div className="card-body p-4">
                    <h4 className="mb-0 fw-bold text-center">Registration</h4>
                    <hr />
                    <p className="mb-2">Join / Sign Up using</p>
                    <div className="social-login mb-4">
                      <div className="row g-4">
                        <div className="col-xl-6">
                          <button
                            type="button"
                            className="btn bg-facebook btn-ecomm w-100 text-white"
                          >
                            <i className="bi bi-facebook me-2" />
                            Facebook
                          </button>
                        </div>
                        <div className="col-xl-6">
                          <button
                            type="button"
                            className="btn bg-pinterest btn-ecomm w-100 text-white"
                          >
                            <i className="bi bi-google me-2" />
                            Google
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="separator mb-4">
                      <div className="line" />
                      <p className="mb-0 fw-bold">Or</p>
                      <div className="line" />
                    </div>
                    <form onSubmit={postData}>
                      <div className="row g-4">
                        <div className="col-6">
                          <label className="form-label">
                            Name
                          </label>
                          <input type="text" placeholder="Name" name="name" onChange={getInputData} className={`form-control rounded-0 ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />

                          {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                        </div>
                        <div className="col-6">
                          <label className="form-label">
                            UserName
                          </label>
                          <input type="text" placeholder="UserName" name="username" onChange={getInputData} className={`form-control rounded-0 ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />

                          {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : ""}
                        </div>
                        <div className="col-6">
                          <label className="form-label">
                            Mobile
                          </label>
                          <input type="text" placeholder="Mobile Number" name="phone" onChange={getInputData} className={`form-control rounded-0 ${show && errorMessage.phone ? 'border-danger' : 'border-dark'}`} />

                          {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : ""}
                        </div>
                        <div className="col-6">
                          <label className="form-label">
                            Email ID
                          </label>
                          <input type="email" placeholder="Email" name="email" onChange={getInputData} className={`form-control rounded-0 ${show && errorMessage.email ? 'border-danger' : 'border-dark'}`} />

                          {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : ""}
                        </div>
                        <div className="col-6">
                          <label className="form-label">
                            Password
                          </label>
                          <input type="password" name="password" onChange={getInputData} className={`form-control rounded-0 ${show && errorMessage.password ? 'border-danger' : 'border-dark'}`} />

                          {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : ""}
                        </div>
                        <div className="col-6">
                          <label className="form-label">
                            Confirm Password
                          </label>
                          <input type="password" name="cpassword" onChange={getInputData} className={`form-control rounded-0 ${show && errorMessage.password ? 'border-danger' : 'border-dark'}`} />

                          {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : ""}
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input type="checkbox" name="consent" onChange={getInputData} className="form-check-input" />

                            <label className="form-check-label">
                              &emsp; I agree to Terms and Conditions
                            </label>
                            {show && errorMessage.consent ? <p className='text-danger'>{errorMessage.consent}</p> : null}


                          </div>
                        </div>
                        <div className="col-12">
                          <hr className="my-0" />
                        </div>
                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-dark rounded-0 btn-ecomm w-100"
                          >
                            Sign Up
                          </button>
                        </div>
                        <div className="col-12 text-center">
                          <p className="mb-0 rounded-0 w-100">
                            Already have an account?{" "}
                            <Link to="/login" className="text-danger">
                              Log In
                            </Link>
                          </p>
                        </div>
                      </div>
                      {/*-end row*/}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
        </section>
        {/*start product details*/}
      </div>
      {/*end page content*/}
    </>
  )
}
