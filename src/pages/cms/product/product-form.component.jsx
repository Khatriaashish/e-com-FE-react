import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Row, Col, Image, Button } from "react-bootstrap"
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import placeholder from "../../../assets/image/image-placeholder.jpg"
import { ErrorMessage } from "../../../component/common/validation-message/validation-message.component";
import { ImageUploader } from "../../../component/common/form/input.component";
import { ButtonComponent } from "../../../component/common/button/button.component";
import categorySvc from "../category/category.service";
import { useEffect, useState } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable"
import brandSvc from "../brand/brand.service";
import userSvc from "../user/user.service";

const ProductForm = ({ submitEvent, loading = false, detail = null }) => {
    const [thumb, setThumb] = useState();
    const [cats, setCats] = useState();
    const [brands, setBrands] = useState();
    const [seller, setSeller] = useState();
    const [attributes, setAtrributes] = useState([{
        key: null,
        value: []
    }]);
    const productSchema = Yup.object({
        title: Yup.string().min(3).required(),
        summary: Yup.string().required(),
        category: Yup.array(Yup.object({
            label: Yup.string(),
            value: Yup.object()
        })),
        brand: Yup.array(Yup.object({
            label: Yup.string(),
            value: Yup.object()
        })),
        price: Yup.number().min(1).required(),
        discount: Yup.number().min(0).default(0).max(100),
        tags: Yup.array(Yup.object({
            label: Yup.string(),
            value: Yup.object(),
            __isNew__: Yup.boolean()
        })),
        seller: Yup.string(),
        attributes: Yup.array(
            Yup.object({
                key: Yup.string(),
                value: Yup.array(Yup.string())
            })
        ).nullable().optional(),
        status: Yup.string().matches(/^(active|inactive)$/, { message: "Status can only be active or inactive" })
    })
    const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm({
        resolver: yupResolver(productSchema)
    })

    const submitForm = (data) => {
        submitEvent(data);
    }

    useEffect(() => {
        if (detail) {
            (Object.keys(detail)).map((field, ind) => {
                if (field !== 'image')
                    setValue(field, detail[field])
            })
            setThumb(detail.image)
        }
    }, [detail])

    const fetchAllCats = async () => {
        try {
            console.log("Here")
            const allData = await categorySvc.categoryLists({ page: 1, limit: 100 })

            if (allData.result.length) {
                let data = [];
                allData.result.map((item) => {
                    data.push({
                        value: item._id,
                        label: item.title
                    })
                })
                setCats(data);
            }
        } catch (exception) {

        }
    }
    const fetchAllBrands = async () => {
        try {
            console.log("Here")
            const allData = await brandSvc.brandLists({ page: 1, limit: 300 })

            if (allData.result.length) {
                let data = [];
                allData.result.map((item) => {
                    data.push({
                        value: item._id,
                        label: item.title
                    })
                })
                setBrands(data);
            }
        } catch (exception) {

        }
    }
    const fetchAllSellers = async () => {
        try {
            console.log("Here")
            const allData = await userSvc.userLists({ role: "seller" })


            setSeller(allData);
        } catch (exception) {

        }
    }

    useEffect(() => {
        // if(showParent){
        fetchAllCats()
        fetchAllBrands()
        fetchAllSellers()
        //}
    }, [])

    console.log(errors)
    return (<>
        <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Title: </Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" placeholder="Enter Product Title..." size="sm" {...register("title", { required: true })} />
                    <ErrorMessage message={errors?.title?.message} />
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Category:</Form.Label>
                <Col sm={9}>
                    <Select options={cats} isMulti onChange={(selectedCat) => {
                        setValue("category", selectedCat)
                    }} />
                    <ErrorMessage message={errors?.status?.message} />
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Brand:</Form.Label>
                <Col sm={9}>
                    <Select options={brands} onChange={(selectedBrand) => {
                        setValue("brand", selectedBrand)
                    }} />
                    <ErrorMessage message={errors?.status?.message} />
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Price: </Form.Label>
                <Col sm={9}>
                    <Form.Control type="number" placeholder="Enter price..." size="sm" {...register("price", { required: true, min: 1 })} />
                    <ErrorMessage message={errors?.price?.message} />
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Discount(%): </Form.Label>
                <Col sm={9}>
                    <Form.Control type="number" placeholder="Enter discount..." size="sm" {...register("discount", { required: false, min: 0, max: 100 })} />
                    <ErrorMessage message={errors?.discount?.message} />
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Summary: </Form.Label>
                <Col sm={9}>
                    <Form.Control as={"textarea"} placeholder="Enter summary" size="sm" rows={5} style={{ resize: "none" }} {...register("summary", { required: true })} />
                    <ErrorMessage message={errors?.summary?.message} />
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Description: </Form.Label>
                <Col sm={9}>
                    <Form.Control as={"textarea"} placeholder="Enter description" size="sm" rows={5} style={{ resize: "none" }} {...register("description", { required: false })} />
                    <ErrorMessage message={errors?.description?.message} />
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Tags: </Form.Label>
                <Col sm={9}>
                    <CreatableSelect isClearable isMulti options={[]} onChange={(e) => {
                        setValue("tags", e)
                    }} />
                    <ErrorMessage message={errors?.discount?.message} />
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Seller: </Form.Label>
                <Col sm={9}>
                    <Form.Select size="sm" {...register("seller")}>
                        {
                            seller && seller.length && seller.map((row, ind) => (
                                <option value={row._id} key={ind}>{row.name}</option>
                            ))
                        }
                    </Form.Select>
                    <ErrorMessage message={errors?.seller?.message} />
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Attributes: </Form.Label>
                <Col sm={9}>
                    {
                        attributes && attributes.length && attributes.map((row, ind) => (
                            <Row className="mb-3" key={ind}>
                                <Col sm={5}>
                                    <Form.Control
                                        type="text"
                                        size="sm"
                                        onChange={(e) => {

                                        }}
                                    />
                                </Col>
                                <Col sm={5}>
                                    <CreatableSelect isClearable isMulti options={[]} onChange={(e) => {
                                        setValue("tags", e)
                                    }} />
                                </Col>
                                <Col sm={2}>
                                    <Button onClick={(e)=>{
                                        let existsAttrs = attributes;
                                        existsAttrs.push({
                                            key: null,
                                            value: []
                                        })
                                        setAtrributes(existsAttrs)
                                        
                                    }} type="button" variant="success" size="sm" className="me-3 mb-3">
                                        <i className="fa-solid fa-plus" />
                                    </Button>
                                    {
                                        ind!==0 && <Button type="button" variant="danger" size="sm">
                                        <i className="fa-solid fa-trash" />
                                    </Button>
                                    }
                                </Col>
                            </Row>
                        ))
                    }
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Status: </Form.Label>
                <Col sm={9}>
                    <Form.Select size="sm" {...register("status")}>
                        <option value="">--SELECT ANY ONE--</option>
                        <option value="active">Publish</option>
                        <option value="inactive">Un-Publish</option>
                    </Form.Select>
                    <ErrorMessage message={errors?.status?.message} />
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Image: </Form.Label>
                <Col sm={7}>
                    <ImageUploader setThumb={setThumb} setValue={setValue} setError={setError} />
                    <ErrorMessage message={errors?.image?.message} />
                </Col>
                <Col sm={2}>
                    <Image src={
                        thumb ?
                            (typeof thumb === 'string') ? import.meta.env.VITE_IMAGE_URL + "/product/" + thumb : URL.createObjectURL(thumb)
                            :
                            placeholder}

                        fluid alt="" />
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3 text-center">
                <Col sm={{ offset: 3, span: 9 }}>
                    <ButtonComponent label="Cancel" type="reset" className="btn-danger me-3" loading={loading} />
                    <ButtonComponent label="Update" type="submit" className="btn-success" loading={loading} />
                </Col>
            </Form.Group>

        </Form>
    </>)
}

export default ProductForm