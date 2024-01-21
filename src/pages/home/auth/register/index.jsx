import { Container, Row, Col, Form, FormGroup, Image } from "react-bootstrap";
import { ButtonComponent } from "../../../../component/common/button/button.component";
import { Title, Divider } from "../../../../component/common/heading/heading.component";
import {useForm} from "react-hook-form"
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Select from "react-select"
import placeholder from "../../../../assets/image/image-placeholder.jpg"
import { useState, useEffect } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup"
import {toast} from "react-toastify"
import AxiosInstance from "../../../../repository/axios.config";
import authSvc from "../auth.service";
import { ImageUploader } from "../../../../component/common/form/input.component";

const options = [
    {value: 'customer', label: 'Buyer'},
    {value: 'seller', label: 'Seller'},
]

const RegisterPage = ()=>{
    const [thumb, setThumb] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const registerSchema = Yup.object({
        name: Yup.string().min(2).max(50).required(),
        email: Yup.string().email().required(),
        role: Yup.string().matches({
            value: Yup.string().matches(/customer|seller/),
            label: Yup.string().matches(/Buyer|Seller/),
        }).required()
    })
    const {register, handleSubmit, setValue, setError, formState: {errors}} = useForm({
        resolver: yupResolver(registerSchema)
    });

    const submitHandler = async (data)=>{
        try{
            setLoading(true);
            console.log(data)

            const response = await authSvc.registerProcess(data);

             console.log(response)
             toast.success(response.message)
             navigate("/")
        }
        catch(except){
            console.log(except)
            toast.error(except.message)
            except.response.data.result.map((obj)=>{
                const keys = Object.keys(obj);
                setError(keys[0], {message: obj[keys[0]]});
            })
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        let token = localStorage.getItem('_au');
        let user = JSON.parse(localStorage.getItem("_user"));
        if(token && user){
            toast.info("You are already loggedIn");
            navigate('/'+user.role)
        }
    })

    console.log(errors)

    return (<>
        <Container className="login-wrapper my-5">
            <Row>
                <Col sm={12} md={{offset: 2, span: 8}}> 
                    <Title>Create an account!</Title>
                </Col>
            </Row>
            <Divider/>
            <Col sm={12} md={{offset:3, span: 6}}>
                <Form onSubmit={handleSubmit(submitHandler)}>
                    <FormGroup className="row mb-3">
                        <Form.Label className="col-sm-3">Name</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" size="sm" {...register("name", {required: true, disabled: loading})} placeholder="Enter your name"/>
                            <span className="text-danger"><em>{errors?.name?.message}</em></span>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <Form.Label className="col-sm-3">Email</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="text" size="sm" {...register("email", {required: true, disabled: loading})} placeholder="Enter your email" disabled={loading}/>
                            <span className="text-danger"><em>{errors?.email?.message}</em></span>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <Form.Label className="col-sm-3">Role</Form.Label>
                        <Col sm={9}>
                            <Select options={options} isDisabled={loading} onChange={(e)=>{
                                setValue("role", e.value)
                            }} />
                            <span className="text-danger"><em>{errors?.role?.message}</em></span>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <Form.Label className="col-sm-3">Image</Form.Label>
                        <Col sm={7}>
                            <ImageUploader loading={loading} setThumb={setThumb} setError={setError} setValue={setValue}/>
                        </Col>
                        <Col sm={2}>
                            <Image src={thumb?URL.createObjectURL(thumb):placeholder} fluid alt=""/>

                        </Col>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <Col>
                            <ButtonComponent label="Submit" loading={loading} className="btn-success me-3" type="submit"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                            Or <NavLink to="/login">Have account?</NavLink>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        </Container>
    </>)
}

export default RegisterPage