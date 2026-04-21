import { useState, useEffect, useRef } from 'react'
import Sidebar from '../../../Components/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ImageValidator from '../../../Validators/ImageValidator'
import FormValidator from '../../../Validators/FormValidator'
import { useDispatch, useSelector } from 'react-redux';
import { getMaincategory } from "../../../Redux/ActionCreators/MaincategoryActionCreator"
import { getSubcategory } from "../../../Redux/ActionCreators/SubcategoryActionCreator"
import { getBrand } from "../../../Redux/ActionCreators/BrandActionCreator"
import { getProduct, updateProduct } from '../../../Redux/ActionCreators/ProductActionCreator'

var rte;

export default function AdminUpdateProductPage() {
    var refdiv = useRef(null);
    let ProductStateData = useSelector(state => state.ProductStateData)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)

    let dispatch = useDispatch()
    let [flag, setFlag] = useState(false)
    let [flag1, setFlag1] = useState(true)

    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: [],
        size: [],
        stockQuantity: 0,
        basePrice: 0,
        discount: 0,
        finalPrice: 0,
        description: "",
        stock: true,
        pic: [],
        active: true
    })

    let { id } = useParams()
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        stockQuantity: 1,
        basePrice: 0,
        discount: 0,
        pic: ""
    })

    let navigate = useNavigate()
    let [show, setShow] = useState(false)
    function getInputData(e) {
        let name = e.target.name
        var value = e.target.files && e.target.files.length ? data.pic.concat(Array.from(e.target.files).map(x => "product/" + x.name)) : e.target.value
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value,
                [name]: name === "stock" ? (value === "1" ? true : false) : value
            }
        })
    }

    function getInputColor_Size(e, field) {
        let name = e.target.name
        if (field === "Color") {
            if (data.color.includes(name)) {
                if (data.color.length > 1) {
                    let index = data.color.indexOf(name)
                    data.color.splice(index, 1)
                }
            }
            else
                data.color.push(name)
        }
        else {
            if (data.size.includes(name)) {
                if (data.size.length > 1) {
                    let index = data.size.indexOf(name)
                    data.size.splice(index, 1)
                }
            }
            else
                data.size.push(name)
        }
        setFlag(!flag)
    }

    useEffect(() => {
        rte = new window.RichTextEditor(refdiv.current);
        rte.setHTMLCode("");
    }, [])
    useEffect(() => {
        dispatch(getMaincategory())
    }, [MaincategoryStateData.length])
    useEffect(() => {
        dispatch(getSubcategory())
    }, [SubcategoryStateData.length])
    useEffect(() => {
        dispatch(getBrand())
    }, [BrandStateData.length])

    function postData(e) {
        e.preventDefault()
        let bp = Number.parseInt(data.basePrice)
        let d = Number.parseInt(data.discount)
        let fp = parseInt(bp - bp * d / 100)
        let stockQuantity = Number.parseInt(data.stockQuantity)

        let error = Object.values(errorMessage).find((x) => x !== "")
        console.log(error)
        if (error)
            setShow(true)
        else {
            dispatch(updateProduct({
                ...data,
                basePrice: bp,
                discount: d,
                finalPrice: fp,
                maincategory: data.maincategory ? data.maincategory : MaincategoryStateData[0].name,
                subcategory: data.subcategory ? data.subcategory : SubcategoryStateData[0].name,
                brand: data.brand ? data.brand : BrandStateData[0].name,
                stockQuantity: stockQuantity,
                description: rte.getHTMLCode()
            }))
            navigate("/admin/product")
        }
    }

    function getAPIdata() {
        dispatch(getProduct())
        if (ProductStateData.length) {
            let item = ProductStateData.find(x => x.id === id)
            if (item)
                setData({ ...data, ...item })
            else
                navigate("/admin/product")

        }
    }

    useEffect(() => {
        getAPIdata()
    }, [ProductStateData.length])

    return (
        <>
            <div className="page-content">
                <div className="container-fluid my-2">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-9">
                            <h5 className='text-light bg-dark p-2 text-center'>Update Product
                                <Link to="/admin/product"> <i className="bi bi-arrow-left float-end text-light"></i></Link></h5>
                            <div className="row">
                                <form onSubmit={postData}>
                                    <div className='mb-3'>
                                        <label>Name*</label>
                                        <input type="text" value={data.name} placeholder="Product" name="name" onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />

                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : ""}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3 mb-3">
                                            <label>Maincategory*</label>
                                            <select name="maincategory" value={data.maincategory} className='form-select text-dark' onChange={getInputData}>
                                                {
                                                    MaincategoryStateData.map((item) => {
                                                        return <option key={item.id}>{item.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label>Subcategory*</label>
                                            <select name="subcategory" value={data.subcategory} className='form-select text-dark' onChange={getInputData}>
                                                {
                                                    SubcategoryStateData.map((item) => {
                                                        return <option key={item.id}>{item.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label>Brand*</label>
                                            <select name="brand" className='form-select text-dark' value={data.brand} onChange={getInputData}>
                                                {
                                                    BrandStateData.map((item) => {
                                                        return <option key={item.id}>{item.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label>Stock*</label>
                                            <select name="stock" value={data.stock ? "1" : "0"} className='form-select text-dark' onChange={getInputData}>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <label>Base Price*</label>
                                            <input type="number" placeholder="BasePrice" value={data.basePrice} name="basePrice" onChange={getInputData} className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'border-dark'}`} />
                                            {show && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : ""}

                                        </div>
                                        <div className="col-md-4">
                                            <label>Discount*</label>
                                            <input type="text" placeholder="Discount" value={data.discount} name="discount" onChange={getInputData} className={`form-control ${show && errorMessage.discount ? 'border-danger' : 'border-dark'}`} />
                                            {show && errorMessage.discount ? <p className='text-danger'>{errorMessage.discount}</p> : ""}

                                        </div>
                                        <div className="col-md-4">
                                            <label>StockQuantity*</label>
                                            <input type="number" placeholder="StockQuantity" name="stockQuantity" onChange={getInputData} value={data.stockQuantity} className={`form-control ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-dark'}`} />
                                            {show && errorMessage.stockQuantity ? <p className='text-danger'>{errorMessage.stockQuantity}</p> : ""}

                                        </div>
                                    </div>

                                    <label>Choose Color*</label>
                                    <div className="form-control border-dark mb-2">
                                        <div className="row mb-3">
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.color.includes("blue")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="blue" /><label>&nbsp;Blue</label>
                                            </div>

                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.color.includes("white")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="white" /><label>&nbsp;White</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.color.includes("yellow")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="yellow" /><label>&nbsp;Yellow</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.color.includes("aqua")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="aqua" /><label>&nbsp;Aqua</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.color.includes("green")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="green" /><label>&nbsp;Green</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.color.includes("black")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="black" /><label>&nbsp;Black</label>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                    <input type="checkbox" checked={data.color.includes("orange")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="orange" /><label>&nbsp;Orange</label>
                                                </div>
                                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                    <input type="checkbox" checked={data.color.includes("violet")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="violet" /><label>&nbsp;Violet</label>
                                                </div>
                                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                    <input type="checkbox" checked={data.color.includes("pink")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="pink" /><label>&nbsp;Pink</label>
                                                </div>
                                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                    <input type="checkbox" checked={data.color.includes("grey")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="grey" /><label>&nbsp;Grey</label>
                                                </div>
                                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                    <input type="checkbox" checked={data.color.includes("brown")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="brown" /><label>&nbsp;Brown</label>
                                                </div>
                                                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                    <input type="checkbox" checked={data.color.includes("maroon")} onChange={(e) => getInputColor_Size(e, "Color")} value={data.color} name="maroon" /><label>&nbsp;Maroon</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <label>Choose Size*</label>
                                    <div className="form-control border-dark mb-2">
                                        <div className="row mb-3">
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.size.includes("s")} onChange={(e) => getInputColor_Size(e, "Size")} value={data.size} name="s" /><label>&nbsp;S</label>
                                            </div>

                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.size.includes("m")} onChange={(e) => getInputColor_Size(e, "Size")} value={data.size} name="m" /><label>&nbsp;M</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.size.includes("l")} onChange={(e) => getInputColor_Size(e, "Size")} value={data.size} name="l" /><label>&nbsp;L</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.size.includes("xL")} onChange={(e) => getInputColor_Size(e, "Size")} value={data.size} name="xL" /><label>&nbsp;XL</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.size.includes("xxl")} onChange={(e) => getInputColor_Size(e, "Size")} value={data.size} name="xxl" /><label>&nbsp;XXL</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" checked={data.size.includes("xxxl")} onChange={(e) => getInputColor_Size(e, "Size")} value={data.size} name="xxxl" /><label>&nbsp;XXXL</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='form-control border-dark mb-3' >
                                        <div ref={refdiv}>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className='col-md-6 mb-3'>
                                            <label>Pic*</label>
                                            <input type="file" name="pic" multiple onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-dark'}`} />
                                            {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : ""}
                                        </div>
                                        <div className='col-md-6 mb-3'>
                                            <label>Pic(click on pic to Delete)</label>
                                            <div>
                                                {
                                                    data.pic?.map((item, index) => {
                                                        return <img onClick={() => {
                                                            data.pic.splice(index, 1)
                                                            setFlag1(!flag1)
                                                        }} src={`${import.meta.env.VITE_SITE_IMG_SERVER}/${item}`} height={80} width={80} className='me-1 mb-1' alt="product-image" key={index} />
                                                    })
                                                }
                                            </div>
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
