import { useDispatch, useSelector } from "react-redux";
import { dashboardActions } from "../../../store/dashboard-slice";

const Button = () =>  {
    const dispatch = useDispatch();
    const listName = useSelector((store:any) => store.dashboard.listName);
    const openModal = () => {
        dispatch(dashboardActions.openCreateModal());
    };
    return (<><button className="btn btn-dark mx-2 my-2" onClick={openModal}>Criar {listName}</button></>);
}
export default Button;