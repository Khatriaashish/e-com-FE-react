import { Form, Col, FormGroup } from "react-bootstrap"
import { ButtonComponent } from "../../common/button/button.component"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup'


const PasswordSetComponent = ({passwordSubmit})=>{
    const yupSchema = Yup.object({
        password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null], "Password doesn't match"
        )
    })
    const { register, handleSubmit,  formState: {errors}} = useForm({
        resolver: yupResolver(yupSchema)
    });
    console.log(errors)
    return(<>
        <Form onSubmit={handleSubmit(passwordSubmit)}>
                    <FormGroup className="row mb-3">
                        <Form.Label className="col-sm-3">Password</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="password" size="sm" {...register("password", {required: true})} placeholder="Enter your username"/>
                            <span className="text-danger"><em>{errors?.password?.message}</em></span>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <Form.Label className="col-sm-3">Re-Enter</Form.Label>
                        <Col sm={9}>
                            <Form.Control type="password" size="sm" {...register("confirmPassword", {required: true})} placeholder="Enter your password"/>
                            <span className="text-danger"><em>{errors?.confirmPassword?.message}</em></span>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row mb-3">
                        <Col sm={{offset:3, span: 9}}>
                            <ButtonComponent label="Set" className="btn-success me-3" type="submit"/>
                            <ButtonComponent label="Reset" className="btn-danger me-3" type="reset"/>
                        </Col>
                    </FormGroup>
                </Form>
    </>)
}

export default PasswordSetComponent