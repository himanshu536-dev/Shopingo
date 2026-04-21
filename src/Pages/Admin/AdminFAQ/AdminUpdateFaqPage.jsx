import { useState, useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import { useDispatch, useSelector } from 'react-redux';
import { getFaq, updateFaq } from '../../../Redux/ActionCreators/FaqActionCreator'

export default function AdminUpdateFaqPage() {
    let FaqStateData = useSelector(state => state.FaqStateData)
    let dispatch = useDispatch()

    let [data, setData] = useState({
        question: "",
        answer: "",
        active: true
    })

    let { id } = useParams()
    let [errorMessage, setErrorMessage] = useState({
        question: "",
        answer: ""
    })

    let navigate = useNavigate()
    let [show, setShow] = useState(false)
    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: FormValidator(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value
            }
        })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x !== "")
        console.log(error)
        if (error)
            setShow(true)
        else {
            let item = FaqStateData.find(x => x.id !== id && x.question.toLowerCase() === data.question.toLowerCase())
            if (item) {
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'name': "Faq Question Already Exists"
                    }
                })
                setShow(true)
                return
            }
        }
        dispatch(updateFaq({ ...data }))
        navigate("/admin/faq")
    }

    function getAPIdata() {
        dispatch(getFaq())
        if (FaqStateData.length) {
            let item = FaqStateData.find(x => x.id === id)
            if (item)
                setData({ ...data, ...item })
            else
                navigate("/admin/faq")
        }
    }

    useEffect(() => {
        getAPIdata()
    }, [FaqStateData.length])

    return (
        <>
            <div className="page-content">
                <div className="container-fluid my-2">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9">
                            <h5 className='text-light bg-dark p-2 text-center'>Update Faq
                                <Link to="/admin/faq"> <i className="bi bi-arrow-left float-end text-light"></i></Link></h5>
                            <div className="row">
                                <form onSubmit={postData}>
                                    <div className='mb-3'>
                                        <label>Question*</label>
                                        <input type="text" value={data.question} placeholder="Faq   " name="question" onChange={getInputData} className={`form-control ${show && errorMessage.question ? 'border-danger' : 'border-dark'}`} />
                                        {show && errorMessage.question ? <p className='text-danger'>{errorMessage.question}</p> : ""}
                                    </div>
                                    <div className='mb-3'>
                                        <label>Answer*</label>
                                        <textarea rows={4} value={data.answer} placeholder="Enter Short Description Here" name="answer" onChange={getInputData} className={`form-control ${show && errorMessage.answer ? 'border-danger' : 'border-dark'}`} />
                                        {show && errorMessage.answer ? <p className='text-danger'>{errorMessage.answer}</p> : ""}
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label >Active*</label>
                                            <select name="active" className='form-select' onChange={getInputData}>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='col-12 mb-3'>
                                        <button type="submit" className='btn btn-dark text-light w-100'>Update Faq</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
