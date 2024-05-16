import { useDispatch, useSelector } from "react-redux";
import { dashboardActions } from "../../store/dashboard-slice";
import EditModalComponents from "./EditModal/index";

// const EditModalStyles: any = {
//    editModal: {
//         container: {
//             position: 'relative',
//         },
//         position: 'fixed',
//         background: 'rgba(0, 0, 0, 0.8)',
//         width: '100%',
//         height: '100%',
//         top: 0,
//         left: 0,
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     modalContent: {
//         background: 'white',
//         padding: '20px',
//         borderRadius: '5px',
//         boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
//         textAlign: 'center',
//     },
//     closeButton: {
//         position: 'absolute',
//         top: '10px',
//         right: '10px',
//         background: 'none',
//         border: 'none',
//         fontSize: '18px',
//         color: 'black',
//         cursor: 'pointer',
//     },
// };

const EditModal = () => {
    const selector = useSelector((state:any) => state.dashboard);
    return (
        <>
        {selector.listName === 'funcionarios' && <EditModalComponents.Funcionario />}
        {selector.listName === 'departamentos' && <EditModalComponents.Departamento />}
        {selector.listName === 'tarefas' && <EditModalComponents.Tarefa />}
        </>
    );
};

export default EditModal;
