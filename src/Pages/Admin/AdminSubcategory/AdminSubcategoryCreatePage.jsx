import { useEffect, useState } from 'react'
import Sidebar from '../../../Components/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import ImageValidator from '../../../Validators/ImageValidator'
import FormValidator from '../../../Validators/FormValidator'
import { useDispatch, useSelector } from 'react-redux';
import { createSubcategory, getSubcategory } from '../../../Redux/ActionCreators/SubcategoryActionCreator'

export default function AdminSubcategoryCreatePage() {
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let dispatch = useDispatch()
    let [data, setData] = useState({
        name: "",
        pic: "",
        active: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mandatory",
        pic: "Pic Field is Mandatory"
    })
    let navigate = useNavigate()
    let [show, setShow] = useState(false)

    function getInputData(e) {
        let name = e.target.name
        var value = e.target.files && e.target.files.length ? "subcategory/" + e.target.files[0].name : e.target.value
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)
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
        dispatch(getSubcategory())
    }, [SubcategoryStateData.length])

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find((x) => x !== "")
        console.log(error)
        if (error)
            setShow(true)
        else {
            let item = SubcategoryStateData.find(x => x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'name': "Subcategory Name Already Exists"
                    }
                })
                setShow(true)
                return
            }

            dispatch(createSubcategory({ ...data }))
            //use following statements when do backend
            // let formData = new FormData()
            // formData.append("name": data.name)
            // formData.append("pic": data.pic)
            // formData.append("active": data.active)
            // dispatch(createSubcategory({formData }))
            navigate("/admin/subcategory")
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
                            <h5 className='text-light bg-dark p-2 text-center'>Create Subcategory
                                <Link to="/admin/subcategory"> <i className="bi bi-arrow-left float-end text-light"></i></Link></h5>
                            <div className="row">
                                <form onSubmit={postData}>
                                    <div className='mb-3'>
                                        <label>Name*</label>
                                        <input type="text" placeholder="Subcategory" name="name" onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />

                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                    </div>
                                    <div className="row">
                                        <div className='col-md-6 mb-3'>
                                            <label>Pic*</label>
                                            <input type="file" name="pic" onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-dark'}`} />

                                            {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : ""}
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
                                        <button type="submit" className='btn btn-dark text-light w-100'>Create Category</button>
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
