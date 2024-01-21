import { Container, Card, Spinner } from "react-bootstrap";
import { HeadingComponent } from "../../../component/common/heading/heading.component";
import BreadcrumbComponent from "../../../component/cms/breadcrumb/breadcrumb.component";
import CategoryForm from "./category-form.component";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import categorySvc from "../category/category.service"
import { useNavigate, useParams } from "react-router-dom";
const CategoryEdit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [detail, setDetail] = useState();

    const params = useParams();

    const editCategory = async(data)=>{
        try{
            setLoading(true);
            let response = await categorySvc.updateCategory(params.id, data);
            toast.success("Category updated successfully");
            navigate("/admin/category")
        }
        catch(except){
            toast.error("Category cannot be edited at this moment");
            console.log(except);
        }
        finally{
            setLoading(false);
        }
    }

    const getById = async(id)=>{
        try{
            setLoading(true);
            const response = await categorySvc.getCategoryById(params.id);
            setDetail({
                title: response.result.title,
                description: response.result.description,
                status: response.result.status,
                image: response.result.image
            })
        }
        catch(except){
            toast.error("Category cannot be fetched at this moment");
            navigate("/admin/category")
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
            <HeadingComponent type={'h1'} className="mt-4" value={"Create Category"} />
            <BreadcrumbComponent data={[
                { title: "Dashboard", link: "/admin" },
                {title: "Category List", link: "/admin/category"},
                { title: "Category Create", link: null }
            ]} />
        </Container>
        <Card className="mb-4">
            <Card.Header>
                <HeadingComponent type={'h4'} value={"Edit Category"} className={'float-start'}></HeadingComponent>
            </Card.Header>
            <Card.Body>
                {
                    loading?<>
                        <Spinner variant="dark"/>
                    </>:<CategoryForm submitEvent={editCategory} loading={loading} detail={detail}/>
                }
            </Card.Body>

        </Card>
    </>)
}

export default CategoryEdit