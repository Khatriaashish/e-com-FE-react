import { Container, Card } from "react-bootstrap";
import { HeadingComponent } from "../../../component/common/heading/heading.component";
import BreadcrumbComponent from "../../../component/cms/breadcrumb/breadcrumb.component";
import BannerForm from "./banner-form.component";
import { useState } from "react";
import { toast } from "react-toastify";
import bannerSvc from "../banner/banner.service"
import { useNavigate } from "react-router-dom";
const BannerCreate = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const submitHandler = async(data)=>{
        try{
            setLoading(true);
            let response = await bannerSvc.storeBanner(data);
            toast.success("Banner Created Successfully");
            navigate("/admin/banner")
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
            <HeadingComponent type={'h1'} className="mt-4" value={"Create Banner"} />
            <BreadcrumbComponent data={[
                { title: "Dashboard", link: "/admin" },
                {title: "Banner List", link: "/admin/banner"},
                { title: "Banner Create", link: null }
            ]} />
        </Container>
        <Card className="mb-4">
            <Card.Header>
                <HeadingComponent type={'h4'} value={"Create New Banner"} className={'float-start'}></HeadingComponent>
            </Card.Header>
            <Card.Body>
                <BannerForm submitEvent={submitHandler} loading={loading}/>
            </Card.Body>

        </Card>
    </>)
}

export default BannerCreate