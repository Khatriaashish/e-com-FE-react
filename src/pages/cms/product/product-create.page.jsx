import { Container, Card } from "react-bootstrap";
import { HeadingComponent } from "../../../component/common/heading/heading.component";
import BreadcrumbComponent from "../../../component/cms/breadcrumb/breadcrumb.component";
import ProductForm from "./product-form.component";
import { useState } from "react";
import { toast } from "react-toastify";
import productSvc from "../product/product.service"
import { useNavigate } from "react-router-dom";
const ProductCreate = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const submitHandler = async(data)=>{
        try{
            setLoading(true);
            let response = await productSvc.storeProduct(data);
            toast.success("Product Created Successfully");
            navigate("/admin/product")
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
            <HeadingComponent type={'h1'} className="mt-4" value={"Create Product"} />
            <BreadcrumbComponent data={[
                { title: "Dashboard", link: "/admin" },
                {title: "Product List", link: "/admin/product"},
                { title: "Product Create", link: null }
            ]} />
        </Container>
        <Card className="mb-4">
            <Card.Header>
                <HeadingComponent type={'h4'} value={"Create New Product"} className={'float-start'}></HeadingComponent>
            </Card.Header>
            <Card.Body>
                <ProductForm submitEvent={submitHandler} loading={loading}/>
            </Card.Body>

        </Card>
    </>)
}

export default ProductCreate