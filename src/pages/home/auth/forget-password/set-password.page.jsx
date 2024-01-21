import { Container, Row, Col, Form, FormGroup, Spinner } from "react-bootstrap";
import authSvc from "../auth.service";

import "./index.css"
import { Divider, Title } from "../../../../component/common/heading/heading.component";
import PasswordSetComponent from "../../../../component/home/auth/password-set.component";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const SetPasswordPage = (props)=>{
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const params = useParams()

    
    const verifyToken = async()=>{
        try{
            const verified = await authSvc.getActivationTokenVerify(params.token);
            setLoading(false);
        }
        catch(except){
            console.log('exception', except)
            toast.error(except.message)
            navigate('/login')
        }
    }

    useEffect(()=>{
        verifyToken()
    }, [params])
    const passwordSubmit = async (data)=>{
        try{
            let response = await authSvc.activateUser(params.token, data);
            toast.success(response.message);
            navigate('/login');
        }
        catch(except){
            toast.error(except.message);
            navigate('/')
        }
    }
    return (<>
        <Container className="login-wrapper my-5">
            <Row>
                <Col sm={12} md={{offset: 3, span: 6}}> 
                    <Title>Set your password!</Title>
                </Col>
            </Row>
            <Divider/>
            <Col sm={12} md={{offset:3, span: 6}}>
                {
                    (loading)?<>
                    <div className="text-center">
                        <Spinner variant="dark"/>
                    </div>
                    </>:<PasswordSetComponent passwordSubmit={passwordSubmit}/>

                }
            </Col>
        </Container>
    </>
    )
}



export default SetPasswordPage