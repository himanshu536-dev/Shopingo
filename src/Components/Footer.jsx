import React, { useState, useEffect } from 'react'
import Newsletter from "../Components/Newsletter"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSetting } from "../Redux/ActionCreators/SettingActionCreator"

export default function Footer() {
  let SettingStateData = useSelector(state => state.SettingStateData)
  let dispatch = useDispatch()
  let [data, setData] = useState({
    map1: "",
    map2: "",
    email: "",
    sitename: "",
    address: "",
    phone: "",
    whatsapp: "",
    youtube: "",
    linkdin: "",
    facebook: "",
    instagram: "",
    twitter: ""
  })

  useEffect(() => {
    dispatch(getSetting())
    if (SettingStateData.length) {
      setData({
        map1: SettingStateData.map1 ? SettingStateData.map1 : import.meta.env.VITE_SITE_MAP1,
        map2: SettingStateData.map2 ? SettingStateData.map2 : import.meta.env.VITE_SITE_MAP2,
        address: SettingStateData.address ? SettingStateData.address : import.meta.env.VITE_SITE_ADDRESS,
        phone: SettingStateData.phone ? SettingStateData.phone : import.meta.env.VITE_SITE_PHONE,
        whatsapp: SettingStateData.whatsapp ? SettingStateData.whatsapp : import.meta.env.VITE_SITE_WHATSAPP,
        youtube: SettingStateData.youtube ? SettingStateData.youtube : import.meta.env.VITE_SITE_YOUTUBE,
        email: SettingStateData.email ? SettingStateData.email : import.meta.env.VITE_SITE_EMAIL,
        twitter: SettingStateData.twitter ? SettingStateData.twitter : import.meta.env.VITE_SITE_TWITTER,
        instagram: SettingStateData.instagram ? SettingStateData.instagram : import.meta.env.VITE_SITE_INSTAGRAM,
        linkdin: SettingStateData.linkdin ? SettingStateData.linkdin : import.meta.env.VITE_SITE_LINKDIN,
        facebook: SettingStateData.facebook ? SettingStateData.facebook : import.meta.env.VITE_SITE_FACEBOOK,
        sitename: SettingStateData.sitename ? SettingStateData.sitename : import.meta.env.VITE_SITE_SITENAME
      })
    }
    else {
      setData({
        map1: import.meta.env.VITE_SITE_MAP1,
        map2: import.meta.env.VITE_SITE_MAP2,
        address: import.meta.env.VITE_SITE_ADDESS,
        phone: import.meta.env.VITE_SITE_PHONE,
        whatsapp: import.meta.env.VITE_SITE_WHATSAPP,
        youtube: import.meta.env.VITE_SITE_YOUTUBE,
        email: import.meta.env.VITE_SITE_EMAIL,
        twitter: import.meta.env.VITE_SITE_TWITTER,
        instagram: import.meta.env.VITE_SITE_INSTAGRAM,
        linkdin: import.meta.env.VITE_SITE_LINKDIN,
        facebook: import.meta.env.VITE_SITE_FACEBOOK,
        sitename: import.meta.env.VITE_SITE_SITENAME
      })
    }
  }, [SettingStateData.length])


  return (
    <>
      <Newsletter />
      {/*start footer*/}
      <section className="footer-section bg-section-2 section-padding bg-dark">
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-4 g-4">
            <div className="col">
              <div className="footer-widget-6">
                <img
                  src="assets/images/logo2.png"
                  className="logo-img mb-3"
                  alt=""
                />
                <h5 className="mb-3 fw-bold text-light">About- {data.sitename}</h5>
                <p className="mb-2 text-justify text-light">
                  Welcome to our eCommerce store  your one-stop destination for trendy fashion, quality products, and unbeatable deals. Shop easily, securely, and enjoy fast doorstep delivery every time!
                </p>

              </div>
            </div>
            <div className="col">
              <div className="footer-widget-7 ms-2 mt-1">
                <h5 className="mb-3 fw-bold text-light">Quick Links</h5>
                <ul className="widget-link list-unstyled">
                  <li>
                    <Link to="/" className='fw-bold text-light'>Home</Link>
                  </li>
                  <li>
                    <Link to="/about" className='fw-bold text-light'>About</Link>
                  </li>
                  <li>
                    <Link to="/shop" className='fw-bold text-light'>Shop</Link>
                  </li>
                  <li>
                    <Link to="/features" className='fw-bold text-light'>Features</Link>
                  </li>
                  <li>
                    <Link to="/testimonial" className='fw-bold text-light'>Testimonial</Link>
                  </li>
                  <li>
                    <Link to="/contact" className='fw-bold text-light'>Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="footer-widget-8 ms-2 mt-1">
                <h5 className="mb-3 fw-bold text-light">Our Policy</h5>
                <ul className="widget-link list-unstyled">
                  <li>
                    <Link to="#" className='fw-bold text-light'>Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="#" className='fw-bold text-light'>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="#" className='fw-bold text-light'>Return Policy</Link>
                  </li>
                  <li>
                    <Link to="#" className='fw-bold text-light'>Data Policy</Link>
                  </li>
                  <div className="mb-3 mt-3">
                    <h5 className="mb-0 fw-bold text-light">Address</h5>
                    <p className="mb-0 text-muted"><Link to={data.map1} target="_blank">{data.address}</Link></p>
                  </div>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="footer-widget-9">
                <h5 className="mb-3 fw-bold text-light ">Follow Us</h5>
                <div className="social-link d-flex align-items-center gap-2">
                  <Link to={data.facebook}>
                    <i className="text-light fw-bold bi bi-facebook" />
                  </Link>
                  <Link to={data.twitter}>
                    <i className="text-light fw-bold bi bi-twitter" />
                  </Link>
                  <Link to={data.linkdin}>
                    <i className="text-light fw-bold bi bi-linkedin" />
                  </Link>
                  <Link to={data.youtube}>
                    <i className="text-light fw-bold bi bi-youtube" />
                  </Link>
                  <Link to={data.instagram}>
                    <i className="text-light fw-bold bi bi-instagram" />
                  </Link>
                </div>
                <div className="mb-3 mt-3">
                  <h5 className="mb-0 fw-bold text-light">Email</h5>
                  <p className="mb-0 text-muted"><Link to={`mailto:${data.email}`}>{data.email}</Link></p>
                </div>
                <div className="mb-3 mt-3">
                  <h5 className="mb-0 fw-bold text-light">Contact Number</h5>
                  <p className="mb-0 text-muted">
                    <Link to={`tel:${data.phone}`}>{data.phone}</Link></p>
                </div>
                <div className="mb-3 mt-3">
                  <h5 className="mb-0 fw-bold text-light">WhatsApp</h5>
                  <p className="mb-0 text-muted">
                    <Link to={`tel:${data.whatsapp}`}>{data.whatsapp}</Link></p>
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}
          <div className="my-5" />
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h5 className="fw-bold mb-3 text-light">Visit us</h5>
              </div>
              <div className="app-icon d-flex flex-column flex-sm-row align-items-center justify-content-center gap-2">
                <div>
                  <Link to={data.map2}>Google Maps</Link>
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}
          <div className="my-5" />
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h5 className="fw-bold mb-3 text-light">Download Mobile App</h5>
              </div>
              <div className="app-icon d-flex flex-column flex-sm-row align-items-center justify-content-center gap-2">
                <div>
                  <a href="javascript:;">
                    <img src="assets/images/play-store.webp" width={160} alt="" />
                  </a>
                </div>
                <div>
                  <a href="javascript:;">
                    <img src="assets/images/apple-store.webp" width={160} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*end footer*/}


      {/*Start Back To Top Button*/}
      <a href="javaScript:;" className="back-to-top">
        <i className="bi bi-arrow-up" />
      </a>
      {/*End Back To Top Button*/}
    </>
  )
}
