import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom"

const CategoryDetailLayoutPage = ()=>{
    const params = useParams();     //for params
    const [query, setQuery] = useSearchParams();    //for search params

    useEffect(()=>{
        
    }, [])
    useEffect(()=>{
        console.log(query.get('price'))
    }, [query])
    return (<>
        <Button onClick={()=>{setQuery({price: "1000-10000"})}}>Rs 1000-1000</Button>
        <Outlet/>
    </>)
}

export default CategoryDetailLayoutPage