import { useDispatch } from "react-redux";
import { dashboardActions } from "../../../../store/dashboard-slice";

const EditButton = (props: any) => {
    const dispatch = useDispatch();
    function openModal() {
        dispatch(dashboardActions.openEditModal({id: props.id}));
    }
    return (<button className={`btn btn-primary`} onClick={openModal}>Ver/Editar</button>);
};

export default EditButton;