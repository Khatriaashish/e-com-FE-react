import { Badge, Button, Card, Container, Pagination, Spinner, Table, Image } from "react-bootstrap"
import { HeadingComponent } from "../../../component/common/heading/heading.component"
import BreadcrumbComponent from "../../../component/cms/breadcrumb/breadcrumb.component"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import brandSvc from "./brand.service"
import thumbnail from "../../../assets/image/image-placeholder.jpg"
import TablePagination from "../../../component/common/pagination/pagination.component"
import swal from "sweetalert2"
import {toast} from "react-toastify"
import { TableActionButtons } from "../../../component/common/button/button.component"

const BrandList = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState();

    const listBrand = async({page=1, search="", limit=10})=>{
        try{
            setLoading(true);
            const response = await brandSvc.brandLists({page, search, limit});
            setData(response.result);
            setPagination({
                ...response.meta,
                pages: (Math.ceil(response.meta.total/response.meta.limit))
            })
        }
        catch(except){
            console.log(except);
            toast.error(except.message);
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        listBrand({page: 1});
    }, [])

    const handleDelete = async(id)=>{
        try{
            setLoading(true);
            let response = await brandSvc.deleteById(id);
            toast.success("Brand deleted successfully");
            listBrand({page: 1});
        }
        catch(except){
            toast.error("Brand cannot be deleted or already deleted");
        }
        finally{
            setLoading(false);
        }
    }

    return (<>
        <Container fluid className="px-4">
            <HeadingComponent type={'h1'} className="mt-4" value={"Brand List"} />
            <BreadcrumbComponent data={[
                { title: "Dashboard", link: "/admin" },
                { title: "Brand List", link: null }
            ]} />
        </Container>
        <Card className="mb-4">
            <Card.Header>
                <HeadingComponent type={'h4'} value={"Brand List"} className={'float-start'}></HeadingComponent>
                <NavLink to="/admin/brand/create" className="btn btn-sm btn-success float-end"><i className="fa fa-plus"></i>&nbsp;Create</NavLink>
            </Card.Header>
            <Card.Body>
                <Table size="sm" bordered hover className="text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <tr>
                                <td colSpan={5}>
                                    <Spinner variant='dark'></Spinner>
                                </td>
                            </tr> : (data ? <>
                                {
                                    data.map((row, ind)=>(
                                        <tr key={ind}>
                                            <td>{row.title}</td>
                                            <td>
                                                {row.description}
                                            </td>
                                            <td>
                                                <Image  onError={(e)=>{
                                                    e.target.src = thumbnail
                                                }} style={{maxWidth: "50px"}} fluid src={import.meta.env.VITE_IMAGE_URL+"/brand/"+ row.image} alt=""/>
                                            </td>
                                            <td>
                                                <Badge bg={`${row.status === 'active' ? 'success' : 'warning'}`}>{row.status}</Badge>
                                            </td>
                                            <td>
                                                <TableActionButtons 
                                                    editUrl={"/admin/brand/"+row._id}
                                                    deleteAction={handleDelete}
                                                    id={row._id}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </> : <tr>
                                <td colSpan={5}>No data found</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
                {
                    pagination ? 
                    <TablePagination pagination={pagination} fetchData={listBrand}/> : <></>
                }
            </Card.Body>
            
        </Card>
    </>)
}

export default BrandList