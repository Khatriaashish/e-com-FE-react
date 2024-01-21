import { Container, Card, Spinner } from "react-bootstrap";
import { HeadingComponent } from "../../../component/common/heading/heading.component";
import BreadcrumbComponent from "../../../component/cms/breadcrumb/breadcrumb.component";
import BannerForm from "./banner-form.component";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import bannerSvc from "../banner/banner.service"
import { useNavigate, useParams } from "react-router-dom";
const BannerEdit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [detail, setDetail] = useState();

    const params = useParams();

    const editBanner = async(data)=>{
        try{
            console.log(data);
            setLoading(true);
            let response = await bannerSvc.updateBanner(params.id, data);
            toast.success("Banner updated successfully");
            navigate("/admin/banner")
        }
        catch(except){
            toast.error("Banner cannot be edited at this moment");
            console.log(except);
        }
        finally{
            setLoading(false);
        }
    }

    const getById = async(id)=>{
        try{
            setLoading(true);
            const response = await bannerSvc.getBannerById(params.id);
            setDetail({
                title: response.result.title,
                url: response.result.url,
                status: response.result.status,
                image: response.result.image
            })
        }
        catch(except){
            toast.error("Banner cannot be fetched at this moment");
            navigate("/admin/banner")
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        getById()
    }, [params])
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
                <HeadingComponent type={'h4'} value={"Edit Banner"} className={'float-start'}></HeadingComponent>
            </Card.Header>
            <Card.Body>
                {
                    loading?<>
                        <Spinner variant="dark"/>
                    </>:<BannerForm submitEvent={editBanner} loading={loading} detail={detail}/>
                }
            </Card.Body>

        </Card>
    </>)
}

export default BannerEdit