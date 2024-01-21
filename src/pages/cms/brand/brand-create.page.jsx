import { Container, Card } from "react-bootstrap";
import { HeadingComponent } from "../../../component/common/heading/heading.component";
import BreadcrumbComponent from "../../../component/cms/breadcrumb/breadcrumb.component";
import BrandForm from "./brand-form.component";
import { useState } from "react";
import { toast } from "react-toastify";
import brandSvc from "../brand/brand.service"
import { useNavigate } from "react-router-dom";
const BrandCreate = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const submitHandler = async(data)=>{
        try{
            setLoading(true);
            let response = await brandSvc.storeBrand(data);
            toast.success("Brand Created Successfully");
            navigate("/admin/brand")
        }
        catch(except){
            console.log(except);
            toast.error(except.message);
        }
        finally{
            setLoading(false);
        }
    }
    return (<>
        <Container fluid className="px-4">
            <HeadingComponent type={'h1'} className="mt-4" value={"Create Brand"} />
            <BreadcrumbComponent data={[
                { title: "Dashboard", link: "/admin" },
                {title: "Brand List", link: "/admin/brand"},
                { title: "Brand Create", link: null }
            ]} />
        </Container>
        <Card className="mb-4">
            <Card.Header>
                <HeadingComponent type={'h4'} value={"Create New Brand"} className={'float-start'}></HeadingComponent>
            </Card.Header>
            <Card.Body>
                <BrandForm submitEvent={submitHandler} loading={loading}/>
            </Card.Body>

        </Card>
    </>)
}

export default BrandCreate