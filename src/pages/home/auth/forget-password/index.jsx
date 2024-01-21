import { Container, Row, Col, Form, FormGroup } from "react-bootstrap";
import "./index.css"
import { ButtonComponent } from "../../../../component/common/button/button.component";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Title, Divider } from "../../../../component/common/heading/heading.component";
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup'



const ForgetPassword = (props)=>{
    const ForgetPasswordSchema = Yup.object({
        email: Yup.string().email().min(1)
    })
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(ForgetPasswordSchema)
    });

    const forgetPasswordSubmit = (data)=>{
        console.log(data)
    }
   console.log(errors)
    return (<>
        <Container className="login-wrapper my-5">
            <Row>
                <Col sm={12} md={{offset: 3, span: 6}}> 
                    <Title>Forgot your password?</Title>
                </Col>
            </Row>
            <Divider/>
            <Col sm={12} md={{offset:3, span: 6}}>
                <Form onSubmit={handleSubmit(forgetPasswordSubmit)}>
                    <FormGroup className="row mb-3 text-center">
                        <Col sm={12}>
                            Find your account by entering your registered email to proceed resetting your password.
                        </Col>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <Col sm={12}>
                            <Form.Control type="email" size="sm" {...register("email", {required: true})} placeholder="Enter your username" className="text-center"/>
                            <span className="text-danger"><em>{errors?.email?.message}</em></span>
                        </Col>
                    </FormGroup>
                    <FormGroup className="text-center mb-3">
                        <Col sm={12}>
                            <ButtonComponent label="Find" className="btn-primary me-3" type="submit"/>
                            <ButtonComponent label="Reset" className="btn-danger me-3" type="reset"/>
                        </Col>
                    </FormGroup>
                    <FormGroup className="text-center row">
                        <Col sm={12} md={6} className="mb-3"> 
                            Or &nbsp; <NavLink to="/login">Login? </NavLink>
                        </Col>
                        <Col sm={12} md={6}>
                            Or &nbsp; &nbsp; <NavLink to="/register">Create a new account?</NavLink>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        </Container>
    </>
    )
}

export default ForgetPassword