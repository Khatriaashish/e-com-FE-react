import { Container, Card } from "react-bootstrap";
import { HeadingComponent } from "../../../component/common/heading/heading.component";
import BreadcrumbComponent from "../../../component/cms/breadcrumb/breadcrumb.component";
import CategoryForm from "./category-form.component";
import { useState } from "react";
import { toast } from "react-toastify";
import categorySvc from "../category/category.service"
import { useNavigate } from "react-router-dom";
const CategoryCreate = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const submitHandler = async(data)=>{
        try{
            setLoading(true);
            let response = await categorySvc.storeCategory(data);
            toast.success("Category Created Successfully");
            navigate("/admin/category")
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
            <HeadingComponent type={'h1'} className="mt-4" value={"Create Category"} />
            <BreadcrumbComponent data={[
                { title: "Dashboard", link: "/admin" },
                {title: "Category List", link: "/admin/category"},
                { title: "Category Create", link: null }
            ]} />
        </Container>
        <Card className="mb-4">
            <Card.Header>
                <HeadingComponent type={'h4'} value={"Create New Category"} className={'float-start'}></HeadingComponent>
            </Card.Header>
            <Card.Body>
                <CategoryForm submitEvent={submitHandler} loading={loading}/>
            </Card.Body>

        </Card>
    </>)
}

export default CategoryCreate