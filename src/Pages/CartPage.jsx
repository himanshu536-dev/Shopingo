import React, { useState, useEffect } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import { getCart, updateCart, deleteCart } from '../Redux/ActionCreators/CartActionCreator'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import OrderDetails from '../Components/OrderDetails';
import { useParams } from 'react-router-dom'
import { createWishlist, getWishlist } from '../Redux/ActionCreators/WishlistActionCreator'

export default function CartPage() {
    let [cart, setCart] = useState([])
    let CartStateData = useSelector(state => state.CartStateData)
    let WishlistStateData = useSelector(state => state.WishlistStateData)

    let [total, setTotal] = useState(0)
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let id = useParams()
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Delete That Item : ")) {
            dispatch(deleteCart({ id: id }))
            getAPIData()
        }
    }

    // Note- use react hot toast for notify the wishlist status . so install (npm i react-hot-toast) it.

    const notify = (msg) => toast(msg);

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

    function updateRecord(option, id) {
        let item = cart.find(x => x.id === id)
        let index = cart.findIndex(x => x.id === id)
        if (option === "DEC" && item.qty === 1)
            return
        else if (option === "DEC") {
            item.qty = item.qty - 1
            item.total = item.total - item.price
        }
        else if (option === "INC" && item.qty < item.stockQuantity) {
            item.qty = item.qty + 1
            item.total = item.total + item.price
        }
        cart[index].qty = item.qty
        cart[index].total = item.total

        dispatch(updateCart({ ...item }))
        calculation(cart)
    }

    function getAPIData() {
        dispatch(getCart())
        if (CartStateData.length) {
            let data = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
            console.log(data)
            setCart(data)
            calculation(data)
        }
        else {
            setCart([])
            calculation([])
        }
    }

    useEffect(() => {
        getAPIData()
    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getWishlist())
        })()
    }, [WishlistStateData.length])

    function addToWishlist(id) {
        let cartItem = cart.find(x => x.id === id)
        let item = WishlistStateData.find(x => x.product === id)
        if (item) {
            notify("Product Already Exist in Wishlist")
        }
        else {
            item = {
                user: localStorage.getItem("userid"),
                product: id,
                name: cartItem.name,
                brand: cartItem.brand,
                price: cartItem.price,
                color: cartItem.color,
                size: cartItem.size,
                stockQuantity: cartItem.stockQuantity,
                pic: cartItem.pic
            }
            dispatch(createWishlist(item))
            notify("Product Added to Wishlist")
        }

    }


    return (
        <>
            {/*start page content*/}
            <div className="page-content">
                {/*start product details*/}
                <Breadcrumb title="Cart" />
                <section className="section-padding">
                    <div className="container">
                        <div className="d-flex align-items-center px-3 py-2 border mb-4">
                            <div className="text-start">
                                <h4 className="mb-0 h4 fw-bold">My Bag ({cart.length} items)</h4>
                            </div>
                            <div className="ms-auto">
                                <Link to="/shop" className="btn btn-light btn-dark">Continue Shopping</Link>
                            </div>
                        </div>
                        <div className="row g-4">
                            <div className="col-12 col-xl-8">
                                {
                                    cart.map(item => {
                                        return <div className="card rounded-0 mb-3" key={item.id}>
                                            <div className="card-body">
                                                <div className="d-flex flex-column flex-lg-row gap-3">
                                                    <div className="product-img">
                                                        <img src={`${import.meta.env.VITE_SITE_IMG_SERVER}/${item.pic}`} width="200px" height="200px" alt="" />
                                                    </div>
                                                    <div className="product-info flex-grow-1">
                                                        <h5 className="fw-bold mb-0">{item.name}</h5>
                                                        <h6 className="fw-bold mb-0">({item.stockQuantity} Left In Stock)</h6>
                                                        <div className="product-price d-flex align-items-center gap-2 mt-3">
                                                            <div className="h6 fw-bold">&#8377;{item.price} X {item.qty} = &#8377;{item.total}</div>
                                                        </div>
                                                        <div className="mt-3 hstack gap-2">
                                                            <button type="button" className="btn btn-sm btn-light border rounded-0">Size : {item.size}</button>
                                                            <button type="button" className="btn btn-sm btn-light border rounded-0">Color : {item.color}</button>
                                                        </div>
                                                        <div className='mt-3'>
                                                            <div className="btn-group">
                                                                <button className='btn btn-sm btn-dark' onClick={() => updateRecord('DEC', item.id)}><i className='bi bi-dash fs-5'></i></button>
                                                                <h3 style={{ width: 50 }} className='text-center'>{item.qty}</h3>
                                                                <button className='btn btn-sm btn-dark' onClick={() => updateRecord('INC', item.id)}><i className='bi bi-plus fs-5'></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-none d-lg-block vr"></div>
                                                    <div className="d-grid gap-2 align-self-start align-self-lg-center">
                                                        <button type="button" className="btn btn-ecomm" onClick={() => deleteRecord(item.id)}><i className="bi bi-x-lg me-2"></i>Remove</button>
                                                        <button type="button" className="btn dark btn-ecomm" onClick={() => addToWishlist(item.id)}><i className="bi bi-suit-heart me-2"></i>Move to Wishlist</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="col-12 col-xl-4">
                                {
                                    cart.length ?
                                        <OrderDetails subtotal={subtotal} shipping={shipping} total={total} /> : null
                                }

                            </div>
                        </div>
                    </div>
                </section>
                <Toaster
                    position='top-right'
                    toastOptions={{
                        className: '',
                        style: {
                            border: '1px solid #713200',
                            padding: '10px',
                            color: 'green',
                            backgroundColor: 'yellow'
                        },
                    }}
                />
            </div>
            {/*end page content*/}
        </>
    )
}
