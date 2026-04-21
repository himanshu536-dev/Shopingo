import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Components/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createSetting, getSetting, updateSetting } from '../../../Redux/ActionCreators/SettingActionCreator'

export default function AdminSettingCreatePage() {
    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()
    let [data, setData] = useState({
        map1: "",
        map2: "",
        email: "",
        sitename: "",
        address: "",
        phone: "",
        whatsapp: "",
        youtube: "",
        linkdin: "",
        facebook: "",
        instagram: "",
        twitter: ""
    })

    let navigate = useNavigate()
    function getInputData(e) {
        let name = e.target.name
        var value = e.target.value
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    useEffect(() => {
        dispatch(getSetting())
        if (SettingStateData.length) {
            setData({ ...data, ...SettingStateData[0] })
        }
    }, [SettingStateData.length])

    function postData(e) {
        e.preventDefault()
        if (SettingStateData.length)
            dispatch(updateSetting({ ...data }))
        else
            dispatch(createSetting({ ...data }))
        alert("Data Has Been Updated")
        navigate("/shop")
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
                            <h5 className='text-light bg-dark p-2 text-center'>Create Settings
                                <Link to="/admin/setting"> <i className="bi bi-arrow-left float-end text-light"></i></Link></h5>
                            <div className="row">
                                <form onSubmit={postData}>
                                    <div className='col-12 mb-3'>
                                        <label>GoogleMapURL*</label>
                                        <input type="url" placeholder="Google Map Link" name="map1" onChange={getInputData} className='form-control border-dark' value={data.map1} />
                                    </div>
                                    <div className='col-12 mb-3'>
                                        <label>GoogleMapURL*</label>
                                        <input type="url" placeholder="Google Map Link" name="map2" onChange={getInputData} value={data.map2} className='form-control border-dark' />
                                    </div>
                                    <div className='col-12 mb-3'>
                                        <label>Address*</label>
                                        <textarea placeholder="Address" value={data.address} rows={3} name="address" onChange={getInputData} className='border-dark form-control' />
                                    </div>
                                    <div className='col-12 mb-3'>
                                        <label>Sitename*</label>
                                        <input type="text" placeholder="Site Name" value={data.sitename} name="sitename" onChange={getInputData} className='border-dark form-control' />
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <label>Phone*</label>
                                            <input type="text" placeholder="Contact Number" name="phone" onChange={getInputData} value={data.phone} className='border-dark form-control' />
                                        </div>
                                        <div className="col-md-4">
                                            <label>Email*</label>
                                            <input type="email" placeholder="Email" name="email" onChange={getInputData} value={data.email} className='border-dark form-control' />
                                        </div>
                                        <div className="col-md-4">
                                            <label>WhatsApp*</label>
                                            <input type="text" placeholder="WhatsApp Number" name="whatsapp" onChange={getInputData} value={data.whatsapp} className='border-dark form-control' />
                                        </div>
                                    </div>
                                    <div className='col-12 mb-3'>
                                        <label>Facebook Profile Page Link*</label>
                                        <input type="url" placeholder="Facebook Profile Page Link" value={data.facebook} name="facebook" onChange={getInputData} className='border-dark form-control' />
                                    </div>
                                    <div className='col-12 mb-3'>
                                        <label>Twitter Profile Page Link*</label>
                                        <input type="url" placeholder="Twitter Profile Page Link" value={data.twitter} name="twitter" onChange={getInputData} className='border-dark form-control' />
                                    </div>
                                    <div className='col-12 mb-3'>
                                        <label>Youtube Profile Page Link*</label>
                                        <input type="url" placeholder="Youtube Profile Page Link" value={data.youtube} name="youtube" onChange={getInputData} className='border-dark form-control' />
                                    </div>
                                    <div className='col-12 mb-3'>
                                        <label>Linkdin Profile Page Link*</label>
                                        <input type="url" placeholder="Linkdin Profile Page Link" value={data.linkdin} name="linkdin" onChange={getInputData} className='border-dark form-control' />
                                    </div>
                                    <div className='col-12 mb-3'>
                                        <label>Instagram Profile Page Link*</label>
                                        <input type="url" placeholder="Instagram Profile Page Link" value={data.instagram} name="instagram" onChange={getInputData} className='border-dark form-control' />
                                    </div>

                                    <div className='col-12 mb-3'>
                                        <button type="submit" className='btn btn-dark text-light w-100'>Create Settings</button>
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
