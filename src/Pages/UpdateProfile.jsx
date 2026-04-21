import React, { useState, useEffect } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import BuyerSidebar from '../Components/BuyerSidebar'
import { useNavigate } from 'react-router-dom'
import FormValidator from "../Validators/FormValidator"

export default function UpdateProfile() {
  let [data, setData] = useState({})
  let navigate = useNavigate()
  let [show, setShow] = useState(false)

  let [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    phone: ""
  })

  function getInputData(e) {
    var { name, value } = e.target
    setErrorMessage(old => {
      return {
        ...old,
        [name]: FormValidator(e)
      }
    })
    setData(old => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/user`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()

      let item = response.find(x => x.id !== data.id && x.email?.toLowerCase() === data.email.toLowerCase())
      console.log(item)
      if (item) {
        setShow(true)
        setErrorMessage(old => {
          return {
            ...old,
            'email': item.email?.toLocaleLowerCase() === data?.email.toLocaleLowerCase() ? "Email Address Already Taken" : ""
          }
        })
      }
      else {
        response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/user/${localStorage.getItem("userid")}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ ...data })
        })
        response = await response.json()
        navigate("/profile")
        if (data.role === "Buyer")
          navigate("/profile")
        else
          navigate("/admin")
      }

    }
  }

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/user/${localStorage.getItem("userid")}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()

      if (response) {
        setData({ ...response })
      }
      else
        alert("Something Went Wrong")
    })()
  }, [])

  return (
    <>
      {/*start page content*/}
      <div className="page-content">
        <Breadcrumb title="Profile" />
        {/*start product details*/}
        <section className="section-padding">
          <div className="container">
            <div className="d-flex align-items-center px-3 py-2 border mb-4">
              <div className="text-center w-100">
                <h4 className="mb-0 h4 fw-bold">Account - Edit Profile</h4>
              </div>
            </div>
            <div
              className="btn btn-dark btn-ecomm d-xl-none position-fixed top-50 start-0 translate-middle-y"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbarFilter"
            >
              <span>
                <i className="bi bi-person me-2" />
                Account
              </span>
            </div>
            <div className="row">
              <div className="col-12 col-xl-3 filter-column">
                <nav className="navbar navbar-expand-xl flex-wrap p-0">
                  <div
                    className="offcanvas offcanvas-start"
                    tabIndex={-1}
                    id="offcanvasNavbarFilter"
                    aria-labelledby="offcanvasNavbarFilterLabel"
                  >
                    <div className="offcanvas-header">
                      <h5
                        className="offcanvas-title mb-0 fw-bold text-uppercase"
                        id="offcanvasNavbarFilterLabel"
                      >
                        Account
                      </h5>
                      <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      />
                    </div>
                    <BuyerSidebar />
                  </div>
                </nav>
              </div>
              <div className="col-12 col-xl-7">
                <div className="card rounded-0">
                  <div className="card-body p-lg-5">
                    <form onSubmit={postData}>
                      <div className="row row-cols-1 g-3">
                        <div className="col">
                          <div className="form-floating">
                            <input type="text" name="name" placeholder="Name" value={data.name} onChange={getInputData} className={`form-control rounded-0 ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />

                            {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}

                            <label htmlFor="floatingInputName">Name</label>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="text" name="phone" placeholder="Mobile Number" value={data.phone} onChange={getInputData} className={`form-control rounded-0 ${show && errorMessage.phone ? 'border-danger' : 'border-dark'}`} />

                            {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : ""}
                            <label htmlFor="floatingInputNumber">
                              Contact Number
                            </label>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="email" name="email" placeholder="Mobile Number" value={data.email} onChange={getInputData} className={`form-control rounded-0 ${show && errorMessage.email ? 'border-danger' : 'border-dark'}`} />

                            {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : ""}
                            <label htmlFor="floatingInputEmail">Email</label>
                          </div>
                        </div>

                        <div className="col">
                          <button type="submit"
                            className="btn btn-dark py-3 btn-ecomm w-100"
                          >
                            Save Details
                          </button>
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="btn btn-outline-dark py-3 btn-ecomm w-100"
                            data-bs-toggle="modal"
                            data-bs-target="#ChangePasswordModal"
                          >
                            Change Password
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/*end row*/}
          </div>
        </section>
        {/*start product details*/}

        {/* Change Password Modal */}
        <div className="modal" id="ChangePasswordModal" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content rounded-0">
              <div className="modal-body">
                <h5 className="fw-bold mb-3">Change Password</h5>
                <hr />
                <form>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="floatingInputOldPass"
                      placeholder="Old Password"
                    />
                    <label htmlFor="floatingInputOldPass">Old Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="floatingInputNewPass"
                      placeholder="New Password"
                    />
                    <label htmlFor="floatingInputNewPass">New Password</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="floatingInputConPass"
                      placeholder="Confirm Password"
                    />
                    <label htmlFor="floatingInputConPass">Confirm Password</label>
                  </div>
                  <div className="d-grid gap-3 w-100">
                    <button type="button" className="btn btn-dark py-3 btn-ecomm">
                      Change
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-dark py-3 btn-ecomm"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* end Change Password Modal */}
      </div>
      {/*end page content*/}
    </>
  )
}
