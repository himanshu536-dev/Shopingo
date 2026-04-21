import React, { useState, useEffect } from 'react'
import { getNewsletter, createNewsletter } from "../Redux/ActionCreators/NewsletterActionCreator"
import { useDispatch, useSelector } from 'react-redux'

export default function Newsletter() {
    let [email, setEmail] = useState("")
    let [message, setMessage] = useState("")
    let dispatch = useDispatch()
    let NewsletterStateData = useSelector(state => state.NewsletterStateData)
    
    function postData(e) {
        e.preventDefault()
        if (email === "")
            setMessage("Please Enter Valid Email Address!")
        else if (NewsletterStateData.find(x => x.email === email))
            setMessage("You are already a member with us .")
        else {
            dispatch(createNewsletter({ email: email, active: true }))
            setMessage("Congrats!! You're now a Subscriber.")
        }
        setEmail("")
    }

    useEffect(() => {
        (() => dispatch(getNewsletter()))()
    }, [NewsletterStateData.length])


    return (
        <>
            {/*subscribe banner*/}
            <section className="product-thumb-slider subscribe-banner p-5">
                <div className="row">
                    <div className="col-12 col-lg-6 mx-auto">
                        <div className="text-center">
                            <h3 className="mb-0 fw-bold text-white">
                                Get Latest Update by <br /> Subscribe Our Newsletter
                            </h3>
                            {message ? <p className='text-center text-light fw-bold'>{message}</p> : null}
                            <form onSubmit={postData}>
                                <div className="mt-3">
                                    <input
                                        type="email" className="form-control form-control-lg bubscribe-control rounded-0 px-5 py-3"
                                        placeholder="Enter your email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}
                                    />
                                </div>
                                <div className="mt-3 d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-ecomm bubscribe-button px-5 py-3"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/*subscribe banner*/}
        </>
    )
}

