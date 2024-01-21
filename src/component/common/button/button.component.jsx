import { NavLink } from "react-router-dom";
import swal from "sweetalert2";

export const ButtonComponent = ({ label = 'Submit', loading = false, className = 'btn-success', type = 'submit' }) => {
    return (
        <button type={type} disabled={loading} className={`btn btn-sm ${className}`}>
            {
                (type === 'reset') ? <i className="fa fa-undo me-2"></i> : (type === 'submit') ? <i className="fa fa-paper-plane me-2"></i> : ""
            }
            {label}
        </button>
    )
}

export const TableActionButtons = ({editUrl, deleteAction, id}) => {
    return (<>
        <NavLink to={editUrl} className={"btn btn-sm btn-warning rounded-circle me-1"}>
            <i className="fa fa-pen text-white"></i>
        </NavLink>
        <NavLink onClick={(e) => {
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
                    if (result.isConfirmed) {
                        deleteAction(id);
                    }
                });
        }} className={"btn btn-sm btn-danger rounded-circle me-1"}>
            <i className="fa fa-trash text-white"></i>
        </NavLink>
    </>)
}