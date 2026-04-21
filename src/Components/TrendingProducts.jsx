import React from 'react'
import { Link } from 'react-router-dom'
export default function TrendingProducts({ data }) {

    return (
        <>
            {/*start special product*/}
            <section className="section-padding bg-section-2">
                <div className="container">

                    <div className="card border-0 rounded-0 p-3 depth">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-6 text-center">
                                {
                                    data && data.pic ?
                                        <Link to={`/product/${data.id}`}>
                                            <img
                                                src={`${import.meta.env.VITE_SITE_IMG_SERVER}/${data.pic[0]}`}
                                                className="img-fluid rounded-0"
                                                alt="..." style={{ maxHeight: "500px", width: "100%" }} /></Link> : null
                                }
                            </div>
                            <div className="col-lg-6">
                                <div className="card-body" style={{ maxHeight: "500px", width: "100%" }}>
                                    <h3 className="fw-bold text-center">{data?.name} </h3>
                                    <h4 className="text-center">{data?.maincategory} /{data?.subcategory}/{data?.brand}</h4>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item bg-transparent px-0">
                                            <span dangerouslySetInnerHTML={{ __html: data?.description ? data?.description : "Checkout Our New Arrivals" }} className='text-center'></span>
                                        </li>
                                    </ul>

                                    <Link
                                        to={`/product/${data?.id}`}
                                        className="btn btn-lg btn-outline-dark btn-ecomm px-5 py-1 w-100" >View Details</Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*start special product*/}
        </>
    )
}
