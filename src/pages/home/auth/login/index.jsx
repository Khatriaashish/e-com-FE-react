import { Container, Row, Col, Form, FormGroup } from "react-bootstrap";
import styled from "styled-components";
import "./index.css"
import { ButtonComponent } from "../../../../component/common/button/button.component";

const LoginTitle = styled.h1`
    color: #001900;
    text-align: center;
`

const Divider = styled.hr`
    border-color: #001900;
`
const LoginPage = (props)=>{
   
    return (<>
        <Container className="login-wrapper my-5">
            <Row>
                <Col sm={12} md={{offset: 3, span: 6}}> 
                    <LoginTitle>Login Page</LoginTitle>
                </Col>
            </Row>
            <Divider/>
            <Col sm={12} md={{offset:3, span: 6}}>
                <Form>
                    <FormGroup className="row mb-3">
                        <Form.Label className="col-sm-3">Username</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="email" size="sm" required placeholder="Enter your username"/>
                            <span className="text-danger"><em></em></span>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <Form.Label className="col-sm-3">Password</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="password" size="sm" required placeholder="Enter your password"/>
                            <span className="text-danger"><em></em></span>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                    <Col sm={{offset:3, span: 9}} className="mb-3"> 
                            Or &nbsp; <a href="">Forget password? </a>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <Col sm={{offset:3, span: 9}}>
                            <ButtonComponent label="Submit" className="btn-success me-3" type="submit"/>
                            <ButtonComponent label="Reset" className="btn-danger me-3" type="reset"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                            Or <a href="">No account?</a>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        </Container>
    </>
    )
}



export default LoginPage