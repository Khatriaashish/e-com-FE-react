import { Container, Row, Col, Form } from "react-bootstrap"
import styled from "styled-components"
import "./index.css"
import { ButtonComponent } from "../../../../component/common/button/button.component"

const Title = styled.h1`
    color: #001900;
    text-align: center;
`

const Divider = styled.hr`
    border-color: #001900;
`

const RegisterPage = ()=>{
    return (<>
        <Container className="register-wrapper m-5">
            <Row>
                <Col sm={12} md={{offset:3, span:6}}>
                    <Title> Register </Title>
                </Col>
            </Row>
            <Divider/>
            <Row className="my-3 pb-5">
                <Col sm={12} md={{offset:3, span:6}}>
                    <Form>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Name</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="string" size='sm' required placeholder="Enter your Name"></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Email</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="email" size='sm' required placeholder="Enter your email"></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Role</Form.Label>
                            <Col sm={3}>
                                <Form.Check inline type="radio" id='inline-radio-1' label="customer" name="role"  required placeholder="Enter your email"></Form.Check>
                            </Col>
                            <Col sm={3}>
                                <Form.Check inline type="radio" id='inline-radio-1' label="seller" name="role" required placeholder="Enter your email"></Form.Check>
                            </Col>
                            <Col sm={3}>
                                <Form.Check inline type="radio" id='inline-radio-1' label="admin" name="role" required placeholder="Enter your email"></Form.Check>
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Col sm={{offset:3, span:9}}>
                                <ButtonComponent label="Register"></ButtonComponent>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>)
}

export default RegisterPage