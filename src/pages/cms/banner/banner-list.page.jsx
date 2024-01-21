import { Badge, Button, Card, Container, Pagination, Spinner, Table, Image } from "react-bootstrap"
import { HeadingComponent } from "../../../component/common/heading/heading.component"
import BreadcrumbComponent from "../../../component/cms/breadcrumb/breadcrumb.component"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import bannerSvc from "./banner.service"
import thumbnail from "../../../assets/image/image-placeholder.jpg"
import TablePagination from "../../../component/common/pagination/pagination.component"
import swal from "sweetalert2"
import {toast} from "react-toastify"

const BannerList = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState();

    const listBanner = async({page=1, search="", limit=10})=>{
        try{
            setLoading(true);
            const response = await bannerSvc.bannerLists({page, search, limit});
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
        listBanner({page: 1});
    }, [])

    const handleDelete = async(id)=>{
        try{
            setLoading(true);
            let response = await bannerSvc.deleteById(id);
            toast.success("Banner deleted successfully");
            listBanner({page: 1});
        }
        catch(except){
            toast.error("Banner cannot be deleted or already deleted");
        }
        finally{
            setLoading(false);
        }
    }

    return (<>
        <Container fluid className="px-4">
            <HeadingComponent type={'h1'} className="mt-4" value={"Banner List"} />
            <BreadcrumbComponent data={[
                { title: "Dashboard", link: "/admin" },
                { title: "Banner List", link: null }
            ]} />
        </Container>
        <Card className="mb-4">
            <Card.Header>
                <HeadingComponent type={'h4'} value={"Banner List"} className={'float-start'}></HeadingComponent>
                <NavLink to="/admin/banner/create" className="btn btn-sm btn-success float-end"><i className="fa fa-plus"></i>&nbsp;Create</NavLink>
            </Card.Header>
            <Card.Body>
                <Table size="sm" bordered hover className="text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Title</th>
                            <th>Link</th>
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
                                                <a target="_banner" href={row.url}>{row.url}</a>
                                            </td>
                                            <td>
                                                <Image  onError={(e)=>{
                                                    e.target.src = thumbnail
                                                }} style={{maxWidth: "50px"}} fluid src={import.meta.env.VITE_IMAGE_URL+"/banner/"+ row.image} alt=""/>
                                            </td>
                                            <td>
                                                <Badge bg={`${row.status === 'active' ? 'success' : 'warning'}`}>{row.status}</Badge>
                                            </td>
                                            <td>
                                                <NavLink to = {'/admin/banner/'+row._id} className={"btn btn-sm btn-warning rounded-circle me-1"}>
                                                    <i className="fa fa-pen text-white"></i>
                                                </NavLink>
                                                <NavLink onClick={(e)=>{
                                                    e.preventDefault();
                                                    swal.fire({
                                                        title: "Are you sure?",
                                                        text: "Once deleted, you will not be able to recover this file!",
                                                        icon: "warning",
                                                        showCancelButton: true,
                                                        confirmButtonColor: "#3085d6",
                                                        cancelButtonColor: "#3085d6",
                                                      })
                                                      .then((result) => {
                                                        if(result.isConfirmed){
                                                            handleDelete(row._id);
                                                        }
                                                      });
                                                }} className={"btn btn-sm btn-danger rounded-circle me-1"}>
                                                    <i className="fa fa-trash text-white"></i>
                                                </NavLink>
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
                    <TablePagination pagination={pagination} fetchData={listBanner}/> : <></>
                }
            </Card.Body>
            
        </Card>
    </>)
}

export default BannerList