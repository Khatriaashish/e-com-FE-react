import { Navigate } from "react-router-dom"

const PermissionCheck = ({ accessBy, Component})=>{
    //TODO: Logic
    const [user, setUset] = useState({
        name: "Sandesh",
        role: "seller"
    })
    if(user.role === accessBy)
        return Component
    else
        return <Navigate to={'/'+ user.role}/>
}

export default PermissionCheck