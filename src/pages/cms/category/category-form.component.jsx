import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Col, Image } from "react-bootstrap"
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import placeholder from "../../../assets/image/image-placeholder.jpg"
import { ErrorMessage } from "../../../component/common/validation-message/validation-message.component";
import { ImageUploader } from "../../../component/common/form/input.component";
import { ButtonComponent } from "../../../component/common/button/button.component";
import categorySvc from "./category.service";
import { useEffect, useState } from "react";

const CategoryForm = ({submitEvent, loading=false, detail=null})=>{
    const [thumb, setThumb] = useState();
    const [cats, setCats] = useState();
    const categorySchema = Yup.object({
        title: Yup.string().min(3).required(),
        description: Yup.string().optional(),
        parentId: Yup.string().optional().nullable(),
        status: Yup.string().matches(/^(active|inactive)$/, {message: "Status can only be active or inactive"})
    })
    const {register, handleSubmit, setValue, setError, formState: {errors}} = useForm({
        resolver: yupResolver(categorySchema)
    })

    const submitForm = (data)=>{
        submitEvent(data);
    }

    useEffect(()=>{
        if(detail){
            (Object.keys(detail)).map((field, ind)=>{
                if(field!=='image')
                    setValue(field, detail[field])
            })
            setThumb(detail.image)
        }
    }, [detail])

    const fetchAllCats =async()=>{
        try{
            const allData=await categorySvc.categoryLists({page:1,limit:100})
            setCats(allData.result)
        }catch(exception){

        }
    }

    useEffect(()=>{
       // if(showParent){
            fetchAllCats()
        //}
    },[])

    console.log(errors)
    return (<>
        <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Title: </Form.Label>
                <Col sm={9}>
                    <Form.Control type="text" placeholder="Enter Category Title..." size="sm" {...register("title", {required: true})}/>
                    <ErrorMessage message={errors?.title?.message}/>
                </Col>
            </Form.Group>

            <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Sub-category of:</Form.Label>
                    <Col sm={9}>
                        <Form.Select size="sm" {...register("parentId")}>
                            <option value="">--Select Any One--</option>
                            {
                                cats && cats.map((row,ind) =>(
                                    <option key={ind} value={row._id}>
                                        {row.title}
                                    </option>
                                ))
                            }

                        </Form.Select>
                         <ErrorMessage message={errors?.status?.message} />
                    </Col>
            </Form.Group>

            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Description: </Form.Label>
                <Col sm={9}>
                    <Form.Control as={"textarea"} placeholder="Enter description" size="sm" rows={5} style={{resize: "none"}} {...register("description", {required: false})}/>
                    <ErrorMessage message={errors?.description?.message}/>
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
                    <ErrorMessage message={errors?.status?.message}/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3 text-center">
                <Form.Label className="col-sm-3">Image: </Form.Label>
                <Col sm={7}>
                    <ImageUploader setThumb={setThumb} setValue={setValue} setError={setError}/>
                    <ErrorMessage message={errors?.image?.message}/>
                </Col>
                <Col sm={2}>
                    <Image src={
                        thumb?
                            (typeof thumb === 'string')?import.meta.env.VITE_IMAGE_URL+"/category/"+thumb : URL.createObjectURL(thumb)
                            :
                            placeholder} 
                    
                    fluid alt=""/>
                </Col>
            </Form.Group>
            <Form.Group className="row mb-3 text-center">
                <Col sm={{offset: 3, span: 9}}>
                    <ButtonComponent label="Cancel" type="reset" className="btn-danger me-3" loading={loading}/>
                    <ButtonComponent label="Update" type="submit" className="btn-success" loading={loading}/>
                </Col>
            </Form.Group>
            
        </Form>
    </>)
}

export default CategoryForm