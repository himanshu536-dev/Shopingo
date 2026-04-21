import { useState, useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ImageValidator from '../../../Validators/ImageValidator'
import FormValidator from '../../../Validators/FormValidator'
import { useDispatch, useSelector } from 'react-redux';
import { getMaincategory, updateMaincategory } from '../../../Redux/ActionCreators/MaincategoryActionCreator'

export default function AdminUpdateMaincategoryPage() {
  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let dispatch = useDispatch()

  let [data, setData] = useState({
    name: "",
    pic: "",
    active: true
  })

  let { id } = useParams()

  let [errorMessage, setErrorMessage] = useState({
    name: "",
    pic: ""
  })

  let navigate = useNavigate()

  let [show, setShow] = useState(false)

  function getInputData(e) {
    let name = e.target.name
    let value = e.target.files ? "maincategory/" + e.target.files[0].name : e.target.value
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

  function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find((x) => x !== "")
    console.log(error)
    if (error)
      setShow(true)
    else {
      let item = MaincategoryStateData.find(x => x.id !== id && x.name.toLowerCase() === data.name.toLowerCase())
      if (item) {
        setErrorMessage((old) => {
          return {
            ...old,
            'name': "Maincategory Name Already Exists"
          }
        })
        setShow(true)
        return
      }
    }
    dispatch(updateMaincategory({ ...data }))
    navigate("/admin/maincategory")
  }

  function getAPIdata() {
    dispatch(getMaincategory())
    if (MaincategoryStateData.length) {
      let item = MaincategoryStateData.find(x => x.id === id)
      if (item)
        setData({ ...data, ...item })
      else
        navigate("/admin/maincategory")
    }
  }

  useEffect(() => {
    getAPIdata()
  }, [MaincategoryStateData.length])

  return (
    <>
      <div className="page-content">
        <div className="container-fluid my-2">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <h5 className='text-light bg-dark p-2 text-center'>Update Maincategory
                <Link to="/admin/maincategory"> <i className="bi bi-arrow-left float-end text-light"></i></Link></h5>
              <div className="row">
                <form onSubmit={postData}>
                  <div className='mb-3'>
                    <label>Name*</label>
                    <input type="text" value={data.name} placeholder="Maincategory" name="name" onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
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
                      <select name="active" value={data.active ? "1" : "0"} className='form-select' onChange={getInputData}>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                  </div>

                  <div className='col-12 mb-3'>
                    <button type="submit" className='btn btn-dark text-light w-100'>Update Category</button>
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
