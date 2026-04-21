import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreator"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreator"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreator"
import { getCart, deleteCart } from '../Redux/ActionCreators/CartActionCreator'
import { useDispatch, useSelector } from 'react-redux';

export default function Navbar() {
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let [cart, setCart] = useState([])
    let CartStateData = useSelector(state => state.CartStateData)

    let navigate = useNavigate()
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMaincategory())
    }, [MaincategoryStateData.length])
    useEffect(() => {
        dispatch(getSubcategory())
    }, [SubcategoryStateData.length])
    useEffect(() => {
        dispatch(getBrand())
    }, [BrandStateData.length])

    function getAPIData() {
        dispatch(getCart())
        if (CartStateData.length) {
            let data = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
            setCart(data)
        }
        else
            setCart([])
    }

    useEffect(() => {
        getAPIData()
    }, [CartStateData.length])
    
    function logout() {
        localStorage.clear()
        navigate("/login")
    }

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Delete That Item : ")) {
            dispatch(deleteCart({ id: id }))
            getAPIData()
        }
    }


    return (
        <>
            {/* <!--page loader--> */}
            {/* <div className="loader-wrapper">
                <div className="d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
                    <div className="spinner-border text-dark" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div> */}
            {/* <!--end loader--> */}

            {/* <!--start top header--> */}
            <header className="top-header">
                <nav className="navbar navbar-expand-xl w-100 navbar-dark container gap-3">
                    <Link className="navbar-brand d-none d-xl-inline" to="/"><img src="/assets/images/logo.png" className="logo-img" alt="" /></Link>
                    <a className="mobile-menu-btn d-inline d-xl-none" href="javascript:;" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar">
                        <i className="bi bi-list"></i>
                    </a>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar">
                        <div className="offcanvas-header">
                            <div className="offcanvas-logo"><img src="/assets/images/logo.png" className="logo-img" alt="" />
                            </div>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body primary-menu">
                            <ul className="navbar-nav justify-content-start flex-grow-1 gap-1">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="tv-shows.html"
                                        data-bs-toggle="dropdown">
                                        Categories
                                    </a>
                                    <div className="dropdown-menu dropdown-large-menu">
                                        <div className="row">
                                            <div className="col-12 col-xl-3">
                                                <h6 className="large-menu-title">Maincategory</h6>
                                                <ul className="list-unstyled">
                                                    {
                                                        MaincategoryStateData.filter(x => x.active).map(item => {
                                                            return <li key={item.id}><Link to={`/shop?mc=${item.name}`}>{item.name}</Link>
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                            </div>

                                            <div className="col-12 col-xl-3">
                                                <h6 className="large-menu-title">Subcategory</h6>
                                                <ul className="list-unstyled">
                                                    {
                                                        SubcategoryStateData.filter(x => x.active).map(item => {
                                                            return <li key={item.id}><Link to={`/shop?sc=${item.name}`}>{item.name}</Link>
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            <div className="col-12 col-xl-3">
                                                <h6 className="large-menu-title">Brand</h6>
                                                <ul className="list-unstyled">
                                                    {
                                                        BrandStateData.filter(x => x.active).map(item => {
                                                            return <li key={item.id}><Link to={`/shop?br=${item.name}`}>{item.name}</Link>
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                            </div>

                                            <div className="col-12 col-xl-3 d-none d-xl-block">
                                                <div className="pramotion-banner1">
                                                    <img src="assets/images/menu-img.webp" className="img-fluid" alt="" />
                                                </div>
                                            </div>
                                            {/* <!-- end col-3 --> */}
                                        </div>
                                        {/* <!-- end row --> */}
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/shop" > Shop  </Link>

                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about" > About  </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/features" > Features </Link>

                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact" > Contact  </Link>

                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/testimonial" > Testimonial  </Link>

                                </li>
                                {
                                    localStorage.getItem("login") ?
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="javascript:;" data-bs-toggle="dropdown">
                                                {localStorage.getItem("name")}
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                                                <li><Link className="dropdown-item" to="/orders">Orders</Link></li>
                                                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                                <li><Link className="dropdown-item" to="/update-profile">Update Profile</Link></li>
                                                <li><Link className="dropdown-item" to="/buyer-address">Address</Link></li>
                                                <li><button type="button" className="dropdown-item" onClick={() => logout()} >Logout</button></li>

                                            </ul>
                                        </li> :
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login" >Login  </Link>

                                        </li>
                                }
                            </ul>
                        </div>
                    </div>

                    <ul className="navbar-nav secondary-menu flex-row">
                        <li className="nav-item">
                            <a className="nav-link dark-mode-icon" href="javascript:;">
                                <div className="mode-icon">
                                    <i className="bi bi-moon"></i>
                                </div>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="search.html"><i className="bi bi-search"></i></a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/wishlist"><i className="bi bi-suit-heart"></i></Link>
                        </li>
                        <li className="nav-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">
                            <Link className="nav-link position-relative" to="/cart">
                                <div className="cart-badge">8</div>
                                <i className="bi bi-basket2"></i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard"><i className="bi bi-person-circle"></i></Link>
                        </li>
                    </ul>
                </nav>
            </header>

            {/*start cart*/}
            {/* Right cart icon details for cart Items */}
            <div
                className="offcanvas offcanvas-end"
                data-bs-scroll="true"
                tabIndex={-1}
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
            >
                <div className="offcanvas-header bg-section-2">
                    <h5 className="mb-0 fw-bold" id="offcanvasRightLabel">
                        {cart.length} items in the cart
                    </h5>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />
                </div>
                <div className="offcanvas-body">
                    <div className="cart-list">
                        {
                            cart.map(item => {
                                return <div className="d-flex align-items-center gap-3" key={item.id}>
                                    <div className="bottom-product-img">
                                        <a href="product-details.html">
                                            <img src={`${import.meta.env.VITE_SITE_IMG_SERVER}/${item.pic}`} width="80" height="80" alt="" />
                                        </a>
                                    </div>
                                    <div className="">
                                        <h6 className="mb-0 fw-light mb-1">{item.name}</h6>
                                        <p className="mb-0">
                                            <strong>{item.qty} X {item.price}</strong>
                                        </p>
                                    </div>
                                    <div className="ms-auto fs-5">
                                        <button className="link-danger" onClick={() => deleteRecord(item.id)}>
                                            <i className="bi bi-trash" />
                                        </button>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                {
                    cart.length ?
                        <div className="offcanvas-footer p-3 border-top">
                            <div className="d-grid">
                                <Link
                                    type="button" to="/checkout"
                                    className="btn btn-lg btn-dark btn-ecomm px-5 py-3"
                                >
                                    Checkout
                                </Link>
                            </div>
                        </div> : null
                }
            </div>
            {/*end cat*/}
            {/* <!--end top header--> */}
        </>
    )
}
