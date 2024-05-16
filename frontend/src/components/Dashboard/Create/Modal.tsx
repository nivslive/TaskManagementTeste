import { useSelector } from "react-redux";
import Modals from './Modals';
const Modal = () => {
    const listName = useSelector((state: any) => state.dashboard.listName);
    return (<>
        {listName === 'tarefas' && <Modals.Tarefa />}
        {listName === 'departamentos' && <Modals.Departamento />}
        {listName === 'funcionarios' && <Modals.Funcionario />}
    </>);
};

export default Modal;