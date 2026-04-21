import React, { useState, useEffect } from 'react'
import Breadcrumb from '../Components/Breadcrumb'
import { getProduct } from "../Redux/ActionCreators/ProductActionCreator"
import ProductSlider from '../Components/ProductSlider'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { createCart, getCart } from "../Redux/ActionCreators/CartActionCreator"
import { createWishlist, getWishlist } from "../Redux/ActionCreators/WishlistActionCreator"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function ProductPage() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    let ProductStateData = useSelector(state => state.ProductStateData)
    let CartStateData = useSelector(state => state.CartStateData)
    let WishlistStateData = useSelector(state => state.WishlistStateData)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [data, setData] = useState({})
    let [input, setInput] = useState({
        qty: 1,
        color: "",
        size: ""
    })

    let [relatedProducts, setRelatedProducts] = useState([])
    let { id } = useParams()
    function quantity(value) {
        if (value === "min" && input.qty > 1)
            return input.qty - 1
        else if (value === "plus" && input.qty < data.stockQuantity)
            return input.qty + 1
        else
            return input.qty
    }

    function addToCart() {
        let item = CartStateData.find(x => x.user === localStorage.getItem("userid") && x.product === id)

        if (!item) {
            item =
            {
                user: localStorage.getItem("userid"),
                product: id,
                name: data.name,
                brand: data.brand,
                qty: input.qty,
                stockQuantity: data.stockQuantity,
                color: input.color,
                pic: data.pic[0],
                size: input.size,
                price: data.finalPrice,
                total: input.qty * data.finalPrice
            }
            dispatch(createCart(item))
        }
        navigate("/cart")
    }

    function addToWishlist() {
        let item = WishlistStateData.find(x => x.product === id)

        if (!item) {
            item =
            {
                user: localStorage.getItem("userid"),
                product: id,
                name: data.name,
                brand: data.brand,
                stockQuantity: data.stockQuantity,
                color: input.color,
                pic: data.pic[0],
                size: input.size,
                price: data.finalPrice,
            }
            dispatch(createWishlist(item))
        }
        navigate("/wishlist")
    }

    function getInputData(option, value) {
        setInput((old) => {
            return {
                ...old,
                [option]: option === "qty" ? quantity(value) : value
            }
        })
    }

    useEffect(() => {
        dispatch(getProduct())
        if (ProductStateData.length) {
            let item = ProductStateData.find(x => x.id === id)

            setData(item)
            setInput({
                qty: 1,
                color: item.color[0],
                size: item.size[0],
            })
            setRelatedProducts(ProductStateData.filter(x => x.active && x.maincategory === item.maincategory))
        }
    }, [ProductStateData.length, id])

    useEffect(() => {
        (() => {
            dispatch(getCart())
        })()
    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getWishlist())
        })()
    }, [WishlistStateData.length])


    return (
        <>
            {/*start page content*/}
            <div className="page-content">
                <Breadcrumb title="Product Details" />
                {/*start product details*/}
                <section className="py-4">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-12 col-xl-7">

                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#fff',
                                        '--swiper-pagination-color': '#fff',
                                    }}
                                    loop={true}
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                >

                                    {
                                        data.pic?.map((item, index) => {
                                            return <SwiperSlide key={index}>
                                                <img src={`${import.meta.env.VITE_SITE_IMG_SERVER}/${item}`} style={{ width: "100%", height: 500 }} />
                                            </SwiperSlide>
                                        })
                                    }

                                </Swiper>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper mt-3"
                                >

                                    {
                                        data.pic?.map((item, index) => {
                                            return <SwiperSlide key={index}>
                                                <img src={`${import.meta.env.VITE_SITE_IMG_SERVER}/${item}`} style={{ width: "100%", height: 100 }} />
                                            </SwiperSlide>
                                        })
                                    }

                                </Swiper>


                            </div>
                            {/*end row*/}

                            <div className="col-12 col-xl-5">
                                <div className="product-info">
                                    <h4 className="product-title fw-bold mb-1 text-center">{data.name}</h4>
                                    <p className="mb-0 text-center">
                                        {data.maincategory}/{data.subcategory}/{data.brand}
                                    </p>
                                    <div className="product-rating">
                                        <div className="hstack gap-2 border p-1 mt-3 width-content">
                                            <div>
                                                <span className="rating-number">4.8</span>
                                                <i className="bi bi-star-fill ms-1 text-warning" />
                                            </div>
                                            <div className="vr" />
                                            <div>162 Ratings</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="product-price d-flex align-items-center gap-3">
                                        <div className="h4 fw-bold">&#8377;{data.finalPrice}</div>
                                        <div className="h5 fw-light text-muted text-decoration-line-through">
                                            &#8377;{data.basePrice}
                                        </div>
                                        <div className="h4 fw-bold text-danger">({data.discount} %off)</div>
                                    </div>
                                    <p className="fw-bold mb-0 mt-1 text-success">
                                        inclusive of all taxes
                                    </p>
                                    <div className="more-colors mt-4">
                                        <h6 className="fw-bold mb-3">Select Color</h6>
                                        <div className="d-flex align-items-center gap-3">
                                            {
                                                data.color?.map((item, index) => {
                                                    return <div className="" key={index}>
                                                        <button type="button" className="btn btn-dark rounded-circle" onClick={() => getInputData("color", item)}>{item}
                                                        </button>
                                                    </div>

                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="size-chart mt-4">
                                        <h6 className="fw-bold mb-3">Select Size</h6>
                                        <div className="d-flex align-items-center gap-3">
                                            {
                                                data.size?.map((item, index) => {
                                                    return <div className="" key={index}>
                                                        <button type="button" className=" btn btn-dark rounded-circle" onClick={() => getInputData("size", item)}>{item}
                                                        </button>
                                                    </div>

                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="mt-3 btn-group">
                                        <h6 className='fw-bold mt-3 me-1'>Select Quantity:</h6>
                                        <button className='btn btn-dark' onClick={() => getInputData("qty", "min")}><i className='bi bi-dash text-light'></i></button>
                                        <h3 className='w-50 text-center mx-1'>{input.qty}</h3>
                                        <button className='btn btn-dark' onClick={() => getInputData("qty", "plus")}><i className='bi bi-plus text-light'></i></button>
                                    </div>

                                    <div className="cart-buttons mt-3">
                                        <div className="buttons d-flex flex-column flex-lg-row gap-3 mt-4">
                                            <button onClick={addToCart}
                                                className="btn btn-lg btn-dark btn-ecomm px-5 py-3 col-lg-6"
                                            >
                                                <i className="bi bi-basket2 me-2" />
                                                Add to Cart
                                            </button>
                                            <button onClick={addToWishlist}
                                                className="btn btn-lg btn-dark btn-ecomm px-5 py-3 col-lg-6"
                                            >
                                                <i className="bi bi-basket2 me-2" />
                                                Add to Wishlist
                                            </button>
                                        </div>
                                    </div>
                                    <hr className="my-3" />
                                    <div className="product-info">
                                        <h6 className="fw-bold mb-3">Product Details</h6>
                                        <p className="mb-1" dangerouslySetInnerHTML={{ __html: data.description }}>

                                        </p>

                                    </div>
                                    <hr className="my-3" />
                                    <div className="customer-ratings">
                                        <h6 className="fw-bold mb-3">Customer Ratings</h6>
                                        <div className="d-flex align-items-center gap-4 gap-lg-5 flex-wrap flex-lg-nowrap">
                                            <div className="">
                                                <h1 className="mb-2 fw-bold">
                                                    4.8
                                                    <span className="fs-5 ms-2 text-warning">
                                                        <i className="bi bi-star-fill" />
                                                    </span>
                                                </h1>
                                                <p className="mb-0">3.8k Verified Buyers</p>
                                            </div>
                                            <div className="vr d-none d-lg-block" />
                                            <div className="w-100">
                                                <div className="rating-wrrap hstack gap-2 align-items-center">
                                                    <p className="mb-0">5</p>
                                                    <div className="">
                                                        <i className="bi bi-star" />
                                                    </div>
                                                    <div
                                                        className="progress flex-grow-1 mb-0 rounded-0"
                                                        style={{ height: 4 }}
                                                    >
                                                        <div
                                                            className="progress-bar bg-success"
                                                            role="progressbar"
                                                            style={{ width: "75%" }}
                                                        />
                                                    </div>
                                                    <p className="mb-0">1528</p>
                                                </div>
                                                <div className="rating-wrrap hstack gap-2 align-items-center">
                                                    <p className="mb-0">4</p>
                                                    <div className="">
                                                        <i className="bi bi-star" />
                                                    </div>
                                                    <div
                                                        className="progress flex-grow-1 mb-0 rounded-0"
                                                        style={{ height: 4 }}
                                                    >
                                                        <div
                                                            className="progress-bar bg-success"
                                                            role="progressbar"
                                                            style={{ width: "65%" }}
                                                        />
                                                    </div>
                                                    <p className="mb-0">253</p>
                                                </div>
                                                <div className="rating-wrrap hstack gap-2 align-items-center">
                                                    <p className="mb-0">3</p>
                                                    <div className="">
                                                        <i className="bi bi-star" />
                                                    </div>
                                                    <div
                                                        className="progress flex-grow-1 mb-0 rounded-0"
                                                        style={{ height: 4 }}
                                                    >
                                                        <div
                                                            className="progress-bar bg-info"
                                                            role="progressbar"
                                                            style={{ width: "45%" }}
                                                        />
                                                    </div>
                                                    <p className="mb-0">258</p>
                                                </div>
                                                <div className="rating-wrrap hstack gap-2 align-items-center">
                                                    <p className="mb-0">2</p>
                                                    <div className="">
                                                        <i className="bi bi-star" />
                                                    </div>
                                                    <div
                                                        className="progress flex-grow-1 mb-0 rounded-0"
                                                        style={{ height: 4 }}
                                                    >
                                                        <div
                                                            className="progress-bar bg-warning"
                                                            role="progressbar"
                                                            style={{ width: "35%" }}
                                                        />
                                                    </div>
                                                    <p className="mb-0">78</p>
                                                </div>
                                                <div className="rating-wrrap hstack gap-2 align-items-center">
                                                    <p className="mb-0">1</p>
                                                    <div className="">
                                                        <i className="bi bi-star" />
                                                    </div>
                                                    <div
                                                        className="progress flex-grow-1 mb-0 rounded-0"
                                                        style={{ height: 4 }}
                                                    >
                                                        <div
                                                            className="progress-bar bg-danger"
                                                            role="progressbar"
                                                            style={{ width: "25%" }}
                                                        />
                                                    </div>
                                                    <p className="mb-0">27</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-3" />
                                    <div className="customer-reviews">
                                        <h6 className="fw-bold mb-3">Customer Reviews (875)</h6>
                                        <div className="reviews-wrapper">
                                            <div className="d-flex flex-column flex-lg-row gap-3">
                                                <div className="">
                                                    <span className="badge bg-green rounded-0">
                                                        5<i className="bi bi-star-fill ms-1" />
                                                    </span>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <p className="mb-2">
                                                        This is some content from a media component. You can
                                                        replace this with any content and adjust it as needed.
                                                        Some quick example text to build on the card title and
                                                        make.
                                                    </p>
                                                    <div className="review-img">
                                                        <img
                                                            src="assets/images/featured-products/05.webp"
                                                            alt=""
                                                            width={70}
                                                        />
                                                    </div>
                                                    <div className="d-flex flex-column flex-sm-row gap-3 mt-3">
                                                        <div className="hstack flex-grow-1 gap-3">
                                                            <p className="mb-0">Jhon Deo</p>
                                                            <div className="vr" />
                                                            <div className="date-posted">12 June 2020</div>
                                                        </div>
                                                        <div className="hstack">
                                                            <div className="">
                                                                <i className="bi bi-hand-thumbs-up me-2" />
                                                                68
                                                            </div>
                                                            <div className="mx-3" />
                                                            <div className="">
                                                                <i className="bi bi-hand-thumbs-down me-2" />
                                                                24
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="d-flex flex-column flex-lg-row gap-3">
                                                <div className="">
                                                    <span className="badge bg-green rounded-0">
                                                        4<i className="bi bi-star-fill ms-1" />
                                                    </span>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <p className="mb-2">
                                                        This is some content from a media component. You can
                                                        replace this with any content.
                                                    </p>
                                                    <div className="review-img">
                                                        <img
                                                            src="assets/images/featured-products/02.webp"
                                                            alt=""
                                                            width={70}
                                                        />
                                                    </div>
                                                    <div className="d-flex flex-column flex-sm-row gap-3 mt-3">
                                                        <div className="hstack flex-grow-1 gap-3">
                                                            <p className="mb-0">Jhon Deo</p>
                                                            <div className="vr" />
                                                            <div className="date-posted">15 June 2020</div>
                                                        </div>
                                                        <div className="hstack">
                                                            <div className="">
                                                                <i className="bi bi-hand-thumbs-up me-2" />
                                                                58
                                                            </div>
                                                            <div className="mx-3" />
                                                            <div className="">
                                                                <i className="bi bi-hand-thumbs-down me-2" />
                                                                34
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="d-flex flex-column flex-lg-row gap-3">
                                                <div className="">
                                                    <span className="badge bg-warning rounded-0 text-dark">
                                                        3<i className="bi bi-star-fill ms-1" />
                                                    </span>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <p className="mb-2">
                                                        This is some content from a media component. You can
                                                        replace this with any content and adjust it as needed.
                                                    </p>
                                                    <div className="review-img">
                                                        <img
                                                            src="assets/images/featured-products/04.webp"
                                                            alt=""
                                                            width={70}
                                                        />
                                                    </div>
                                                    <div className="d-flex flex-column flex-sm-row gap-3 mt-3">
                                                        <div className="hstack flex-grow-1 gap-3">
                                                            <p className="mb-0">Jhon Deo</p>
                                                            <div className="vr" />
                                                            <div className="date-posted">22 June 2022</div>
                                                        </div>
                                                        <div className="hstack">
                                                            <div className="">
                                                                <i className="bi bi-hand-thumbs-up me-2" />
                                                                98
                                                            </div>
                                                            <div className="mx-3" />
                                                            <div className="">
                                                                <i className="bi bi-hand-thumbs-down me-2" />
                                                                41
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="d-flex flex-column flex-lg-row gap-3">
                                                <div className="">
                                                    <span className="badge bg-danger rounded-0">
                                                        2<i className="bi bi-star-fill ms-1" />
                                                    </span>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <p className="mb-2">
                                                        You can replace this with any content and adjust it as
                                                        needed. Some quick example text to build on the card
                                                        title and make.
                                                    </p>
                                                    <div className="review-img">
                                                        <img
                                                            src="assets/images/featured-products/01.webp"
                                                            alt=""
                                                            width={70}
                                                        />
                                                    </div>
                                                    <div className="d-flex flex-column flex-sm-row gap-3 mt-3">
                                                        <div className="hstack flex-grow-1 gap-3">
                                                            <p className="mb-0">Jhon Deo</p>
                                                            <div className="vr" />
                                                            <div className="date-posted">22 June 2022</div>
                                                        </div>
                                                        <div className="hstack">
                                                            <div className="">
                                                                <i className="bi bi-hand-thumbs-up me-2" />
                                                                26
                                                            </div>
                                                            <div className="mx-3" />
                                                            <div className="">
                                                                <i className="bi bi-hand-thumbs-down me-2" />
                                                                89
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="text-center">
                                                <a
                                                    href="javascript:;"
                                                    className="btn btn-ecomm btn-outline-dark"
                                                >
                                                    View All Reviws
                                                    <i className="bi bi-arrow-right ms-2" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*end row*/}

                </section>
                <div className='mt-3'>
                    {
                        relatedProducts.length ? <ProductSlider title="Related" data={relatedProducts} /> : null

                    }
                </div>
                {/*start product details*/}
            </div>
        </>
    )
}
