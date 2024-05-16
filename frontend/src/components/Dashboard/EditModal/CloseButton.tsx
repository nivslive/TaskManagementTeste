import { useDispatch } from "react-redux";
import { dashboardActions } from "../../../store/dashboard-slice";

const styles: any = {
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '18px',
        color: 'black',
        cursor: 'pointer',
    },
};
const CloseButton = () => {
    const dispatch = useDispatch();
    function closeModal() {
        dispatch(dashboardActions.closeEditModal());
    }
    return (<>
            <button 
                style={styles.closeButton} 
                onClick={closeModal}>X</button>
            </>
           );
};


export default CloseButton;