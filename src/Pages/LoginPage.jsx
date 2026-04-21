import React, { useState } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  let [data, setData] = useState({
    username: "",
    password: ""
  })

  let [errorMessage, setErrorMessage] = useState("")
  let navigate = useNavigate()
  let [show, setShow] = useState(false)

  function getInputData(e) {
    var { name, value } = e.target
    setData(old => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  async function postData(e) {
    e.preventDefault()
    let response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/user`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    response = await response.json()
    let item = response.find(x => x.username?.toLocaleLowerCase() === data?.username?.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data?.username.toLocaleLowerCase())

    if (item && item.active === false) {
      setErrorMessage("Your Account Has Been Blocked Due to Ssome Unauthourized Action")
    }
    else if (item && item.password === data.password) {
      localStorage.setItem("login", true)
      localStorage.setItem("userid", item.id)
      localStorage.setItem("name", item.name)
      localStorage.setItem("role", item.role)
      if (item.role === "Buyer")
        navigate("/profile")
      else
        navigate("/admin")
    }

    else {
      setShow(true)
      setErrorMessage("Invalid Username / Password")
    }
  }


  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrumb title="Login" />

        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mx-auto">
                <div className="card rounded-0">
                  <div className="card-body p-4">
                    <h4 className="mb-0 fw-bold text-center">User Login</h4>
                    <hr />
                    <p className="mb-2">Join / Sign In using</p>
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
                        <div className="col-12">
                          <label htmlFor="exampleUsername" className="form-label">
                            Username
                          </label>
                          <input
                            type="text"

                            name="username" onChange={getInputData}
                            className={`form-control rounded-0 ${show && errorMessage.username ? 'border-danger' : 'border-dark'}`} />

                          {show ? <p className='text-danger'>{errorMessage}</p> : ""}
                        </div>
                        <div className="col-12">
                          <label htmlFor="examplePassword" className="form-label">
                            Password
                          </label>
                          <input
                            type="password"

                            name="password" onChange={getInputData}
                            className={`form-control rounded-0 ${show && errorMessage.password ? 'border-danger' : 'border-dark'}`} />

                          {show ? <p className='text-danger'>{errorMessage}</p> : ""}
                        </div>
                        <div className="col-12">
                          <a
                            href="javascript:;"
                            className="text-content btn bg-light rounded-0 w-100"
                          >
                            <i className="bi bi-lock me-2" />
                            Forgot Password
                          </a>
                        </div>
                        <div className="col-12">
                          <hr className="my-0" />
                        </div>
                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-dark rounded-0 btn-ecomm w-100"
                          >
                            Login
                          </button>
                        </div>
                        <div className="col-12 text-center">
                          <p className="mb-0 rounded-0 w-100">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-danger">
                              Sign Up
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
