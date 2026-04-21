import React, { useEffect, useState } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import { getCart, deleteCart } from '../Redux/ActionCreators/CartActionCreator'
import { getProduct, updateProduct } from "../Redux/ActionCreators/ProductActionCreator"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { createCheckout } from "../Redux/ActionCreators/CheckoutActionCreator"

export default function CheckoutPage() {
    let [cart, setCart] = useState([])
    let [address, setAddress] = useState([])
    let [selectedAddress, setSelectedAddress] = useState({})
    let [outofstock, setOutofstock] = useState(false)
    let [mode, setMode] = useState("COD")
    let CartStateData = useSelector(state => state.CartStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)

    let [total, setTotal] = useState(0)
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let navigate = useNavigate()
    let dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_SITE_SERVER}/address`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            let ans = (response.filter(x => x.user == localStorage.getItem("userid")))
            setAddress(ans)
            setSelectedAddress({ ...ans[0] })
        })()
    }, [])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (CartStateData.length && ProductStateData.length) {
                let cart = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
                cart.forEach(item => {
                    let p = ProductStateData.find(x => x.id === item.product)
                    if (p.stock === false) {
                        setOutofstock(true)
                    }
                })
            }
        })()
    }, [ProductStateData.length])

    function placeOrder() {
        let item = {
            user: selectedAddress,
            orderStatus: "Order is Placed",
            paymentMode: mode,
            paymentStatus: "Pending",
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            date: new Date(),
            product: cart
        }
        dispatch(createCheckout(item))
        cart.forEach(item => {
            let p = ProductStateData.find(x => x.id === item.product)
            p.stockQuantity = p.stockQuantity - item.qty
            p.stock = p.stockQuantity === 0 ? false : true
            dispatch(updateProduct(p))
            dispatch(deleteCart({ id: item.id }))
        })
        navigate("/order-confirmation")
    }

    function calculation(cart) {
        let sum = 0
        cart.forEach(x => sum = sum + x.total)
        if (sum > 0 && sum < 1000) {
            setShipping(150)
            setTotal(sum + 150)
        }
        else {
            setShipping(0)
            setTotal(sum)
        }
        setSubtotal(sum)
    }

    useEffect(() => {
        (() => {
            dispatch(getCart())
            if (CartStateData.length) {
                let data = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
                setCart(data)
                calculation(data)
            }
            else {
                setCart([])
                calculation([])
            }
        }
        )()
    }, [CartStateData.length])


    return (
        <>
            {/*start page content*/}
            <div className="page-content">
                {/*start product details*/}
                <Breadcrumb title="Checkout" />

                {/*start product details*/}
                <section className="section-padding">
                    <div className="container">
                        <div className="d-flex align-items-center px-3 py-2 border mb-4">
                            <div className="text-start">
                                <h4 className="mb-0 h4 fw-bold">Select Delivery Address</h4>
                            </div>
                        </div>
                        <div className="row g-4">
                            <div className="col-12 col-lg-6">
                                <h6 className="fw-bold mb-3 py-2 px-3 bg-light">Please Carefully Select Address</h6>

                                {
                                    address.map((item, index) => {
                                        return <div className="card rounded-0 mb-3" key={item.id} onClick={() => {
                                            setSelectedAddress({ ...address[index] })
                                        }}>
                                            {
                                                selectedAddress?.id === item.id ?
                                                    <i className='bi bi-check fw-bold' style={{
                                                        position: 'absolute',
                                                        right: 0,
                                                        fontSize: '40px'
                                                    }} /> : null
                                            }

                                            <div className="d-flex flex-column flex-xl-row gap-3">
                                                <div className="address-info form-check flex-grow-1">
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="flexRadioDefault1"
                                                    >
                                                        <span className="fw-bold mb-0 h5">{item.name}</span>
                                                        <br />
                                                        {item.address} <br />
                                                        {item.pin}&emsp;{item.city},{item.state}
                                                        <br />
                                                        <span className="text-dark fw-bold">    &#9990;+91-{item.phone}</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }

                                <div className="col-12 col-lg-12">
                                    <div className="card rounded-0 payment-method">
                                        <div className="row g-0">
                                            <div className="col-12 col-lg-12 bg-light">
                                                <div className="nav flex-column nav-pills">
                                                    <button
                                                        className="nav-link rounded-0"
                                                        data-bs-toggle="pill"
                                                        data-bs-target="#v-pills-home"
                                                        type="button" onClick={() => { setMode("COD") }}
                                                    >
                                                        <i className="bi bi-cash-stack me-2" />
                                                        Cash On Delivery
                                                    </button>
                                                    {
                                                        mode === "COD" ?
                                                            <i className='bi bi-check fw-bold' style={{
                                                                position: 'absolute',
                                                                right: 0,
                                                                fontSize: '40px'
                                                            }} /> : null
                                                    }

                                                    <button
                                                        className="nav-link rounded-0 border-bottom-0"
                                                        id="v-pills-settings-tab"
                                                        data-bs-toggle="pill"
                                                        data-bs-target="#v-pills-settings"
                                                        type="button" onClick={() => { setMode("Net Banking") }}
                                                    >
                                                        <i className="bi bi-bank2 me-2" />
                                                        Net Banking
                                                    </button>
                                                    {
                                                        mode === "Net Banking" ?
                                                            <i className='bi bi-check fw-bold' style={{
                                                                position: 'absolute',
                                                                right: 0,
                                                                top: 35,
                                                                fontSize: '40px'
                                                            }} /> : null
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                        {/*end row*/}
                                    </div>
                                </div>


                            </div>

                            <div className="col-12 col-lg-6">
                                <div className="card rounded-0 mb-3">
                                    <div className="card-body">
                                        <h5 className="fw-bold mb-4">Order Summary</h5>
                                        {
                                            cart.length ?
                                                <table className='border table-bordered table-striped w-100'>
                                                    <thead>
                                                        <tr>
                                                            <th>Product</th>
                                                            <th>Price</th>
                                                            <th>Qty</th>
                                                            <th>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            cart.map(item => {
                                                                return <tr key={item.id}>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.price}</td>
                                                                    <td>{item.qty}</td>
                                                                    <td align="right">{item.total}</td>
                                                                </tr>
                                                            }

                                                            )
                                                        }
                                                    </tbody>

                                                </table>
                                                : null
                                        }
                                        <div className="hstack align-items-center justify-content-between">
                                            <p className="mb-0">Bag Total</p>
                                            <p className="mb-0">&#8377;{subtotal}</p>
                                        </div>
                                        <hr />

                                        <div className="hstack align-items-center justify-content-between">
                                            <p className="mb-0">Delivery Charges</p>
                                            <p className="mb-0">&#8377;{shipping}</p>
                                        </div>
                                        <hr />
                                        <div className="hstack align-items-center justify-content-between fw-bold text-content">
                                            <p className="mb-0">Total Amount</p>
                                            <p className="mb-0">&#8377;{total}</p>
                                        </div>
                                        {
                                            cart.length && outofstock === false ?
                                                <div className="d-grid mt-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark btn-ecomm py-3 px-5" onClick={() => placeOrder()}
                                                    >
                                                        Place Order
                                                    </button>
                                                </div> : <p className='mt-3 text-danger text-center '>One of Cart Item is Out of Stock. Please Remove from Cart<br /><Link to="/cart">Goto Cart to Remove</Link></p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*end row*/}
                    </div>
                </section>
                {/*start product details*/}
            </div>
        </>
    )
}
