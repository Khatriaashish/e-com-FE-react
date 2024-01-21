import { Container, Card, Spinner } from "react-bootstrap";
import { HeadingComponent } from "../../../component/common/heading/heading.component";
import BreadcrumbComponent from "../../../component/cms/breadcrumb/breadcrumb.component";
import ProductForm from "./product-form.component";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import productSvc from "../product/product.service"
import { useNavigate, useParams } from "react-router-dom";
const ProductEdit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [detail, setDetail] = useState();

    const params = useParams();

    const editProduct = async(data)=>{
        try{
            setLoading(true);
            let response = await productSvc.updateProduct(params.id, data);
            toast.success("Product updated successfully");
            navigate("/admin/product")
        }
        catch(except){
            toast.error("Product cannot be edited at this moment");
            console.log(except);
        }
        finally{
            setLoading(false);
        }
    }

    const getById = async(id)=>{
        try{
            setLoading(true);
            const response = await productSvc.getProductById(params.id);
            setDetail({
                title: response.result.title,
                description: response.result.description,
                status: response.result.status,
                image: response.result.image
            })
        }
        catch(except){
            toast.error("Product cannot be fetched at this moment");
            navigate("/admin/product")
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
            <HeadingComponent type={'h1'} className="mt-4" value={"Create Product"} />
            <BreadcrumbComponent data={[
                { title: "Dashboard", link: "/admin" },
                {title: "Product List", link: "/admin/product"},
                { title: "Product Create", link: null }
            ]} />
        </Container>
        <Card className="mb-4">
            <Card.Header>
                <HeadingComponent type={'h4'} value={"Edit Product"} className={'float-start'}></HeadingComponent>
            </Card.Header>
            <Card.Body>
                {
                    loading?<>
                        <Spinner variant="dark"/>
                    </>:<ProductForm submitEvent={editProduct} loading={loading} detail={detail}/>
                }
            </Card.Body>

        </Card>
    </>)
}

export default ProductEdit