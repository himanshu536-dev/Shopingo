import { useEffect, useState } from 'react'
import Sidebar from '../../../Components/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import { useDispatch, useSelector } from 'react-redux';
import { createFeature, getFeature } from '../../../Redux/ActionCreators/FeatureActionCreator'

export default function AdminFeatureCreatePage() {
    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()
    let [data, setData] = useState({
        name: "",
        shortDescription: "",
        icon: "",
        active: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mandatory",
        icon: "Icon Field is Mandatory",
        shortDescription: " shortDescription Field is Mandatory"
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

    useEffect(() => {
        dispatch(getFeature())
    }, [FeatureStateData.length])

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x !== "")
        console.log(error)
        if (error)
            setShow(true)
        else {
            let item = FeatureStateData.find(x => x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'name': "Feature Name Already Exists"
                    }
                })
                setShow(true)
                return
            }
            dispatch(createFeature({ ...data }))
            navigate("/admin/feature")
        }
    }

    return (
        <>
            <div className="page-content">
                <div className="container-fluid my-2">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9">
                            <h5 className='text-light bg-dark p-2 text-center'>Create Feature
                                <Link to="/admin/feature"> <i className="bi bi-arrow-left float-end text-light"></i></Link></h5>
                            <div className="row">
                                <form onSubmit={postData}>
                                    <div className='mb-3'>
                                        <label>Name*</label>
                                        <input type="text" placeholder="Feature" name="name" onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                    </div>
                                    <div className='mb-3'>
                                        <label>Short Description*</label>
                                        <textarea rows={4} placeholder="Enter Short Description Here" name="shortDescription" onChange={getInputData} className={`form-control ${show && errorMessage.shortDescription ? 'border-danger' : 'border-dark'}`} />
                                        {show && errorMessage.shortDescription ? <p className='text-danger'>{errorMessage.shortDescription}</p> : ""}
                                    </div>

                                    <div className="row">
                                        <div className='col-md-6 mb-3'>
                                            <label>Icon*</label>
                                            <input type="text" placeholder="Icon Tag" name="icon" onChange={getInputData} className={`form-control ${show && errorMessage.icon ? 'border-danger' : 'border-dark'}`} />
                                            {show && errorMessage.icon ? <p className='text-danger'>{errorMessage.icon}</p> : ""}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label >Active*</label>
                                            <select name="active" className='form-select' onChange={getInputData}>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='col-12 mb-3'>
                                        <button type="submit" className='btn btn-dark text-light w-100'>Create Feature</button>
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