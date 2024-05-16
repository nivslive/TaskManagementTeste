import { useDispatch } from "react-redux";
import { dashboardActions } from "../../../../store/dashboard-slice";

const CloseButton = () => {
    const dispatch = useDispatch();
    const closeButton = () => {
        dispatch(dashboardActions.closeCreateModal())
    };
    return (<>
        <button onClick={closeButton}>
            X
        </button>
    </>);
};

export default CloseButton;