import { useDispatch, useSelector } from "react-redux";
import { dashboardActions } from "../../../../store/dashboard-slice";
import funcionarioData from "../../../../data/Funcionario";
import tarefaData from "../../../../data/Tarefa";
import departamentoData from "../../../../data/Departamento";

const DeleteButton = (props: any) => {
    const listName = useSelector((store: any) => store.dashboard.listName);
    const dispatch = useDispatch();
    const handleDelete = (idOnDBToDelete: any, indexToDelete: any) => {
        
        // switch(listName) {
        //     case 'tarefas':
        //         tarefaData.delete(`/${idOnDBToDelete}`);
        //         break;
        //     case 'funcionarios':
        //         funcionarioData.delete(`/${idOnDBToDelete}`);
        //         break;
        //     case 'departamentos':
        //         departamentoData.delete(`/${idOnDBToDelete}`);
        //         break;
        // }

        dispatch(dashboardActions.deleteItem(indexToDelete));
    };
    return (<button onClick={() => handleDelete(props.dbId, props.stateKey)} className="btn btn-danger me-2"> Deletar </button>);
};

export default DeleteButton;