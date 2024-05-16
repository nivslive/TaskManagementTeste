import { useDispatch, useSelector } from "react-redux";
import EditModalComponents from './index';
import { useEffect, useState } from "react";
import Input from "./Input";
import moment from "moment";
import { dashboardActions } from "../../../store/dashboard-slice";
import tarefaData from "../../../data/Tarefa";
import Selects from "./Selects";

const style: any = {
   p: {},
   editModal: {
        container: {
            position: 'relative',
            maxWidth: window.innerWidth >= 991 ? '60vw' : 'initial',
        },
        position: 'fixed',
        background: 'rgba(0, 0, 0, 0.8)',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        background: 'white',
        padding: '20px',
        overflow: 'scroll',
        borderRadius: '5px',
        maxHeight: '70vh',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
    },
};

interface EditDataState {
    id: number,
    title: string,
    description: string,
    assignee_id: number,
    due_date: string,
    created_at: string,
    updated_at: string,
}
interface DashboardState {
    dashboard: { editData: EditDataState,},
}

const Tarefa = () => {
    const selector = useSelector((state:DashboardState) => state.dashboard);
    const dispatch = useDispatch();

    
    const [editedData, setEditedData] = useState<EditDataState>({
        id: selector.editData.id,
        title: selector.editData.title,
        description: selector.editData.description,
        assignee_id: selector.editData.assignee_id,
        due_date: selector.editData.due_date,
        created_at: selector.editData.created_at,
        updated_at: selector.editData.updated_at
    });

    useEffect(() => {
        dispatch(dashboardActions.putEditedDataOnItem({editedData}));
        const body = {title: editedData.title, description: editedData.description, assignee_id: editedData.assignee_id};
        tarefaData.update(`/${editedData.id}`, body);
    }, [dispatch, editedData]);

    function sendEditedData(e: any) {
        e.preventDefault();
        setEditedData((prevData) => ({
            ...prevData,
            [e.target.title.name]: e.target.title.value,
            [e.target.description.name]: e.target.description.value,
            assignee_id: Number(assigneeEvent),
        }));
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const [assigneeEvent, setAssigneeSelect] = useState<any>(selector.editData.assignee_id);
    const handleSelectChange = (event: any) => {
        setAssigneeSelect(event.target.value);
        setEditedData((prevData) => ({
            ...prevData,
            assignee_id: Number(event.target.value),
        }));
    }

    return (
        <div style={style.editModal}>
            <div style={style.editModal.container}>
                <EditModalComponents.CloseButton />
                <form onSubmit={sendEditedData}>
                <div style={style.modalContent}>
                    <h4>Titulo <br/> <i>{editedData.title}</i></h4>
                    <Input name="title" label="Edite o titulo:" value={editedData.title} onChange={handleInputChange} />
                    <h4>Description</h4>
                    <i><p style={style.p}>{editedData.description}</p></i>
                    <Input name="description" label="Edite a description:" value={editedData.description} onChange={handleInputChange} />
                    {/* <Input name="assignee_id" label="Assignee Id" value={editedData.assignee_id} onChange={handleInputChange} /> */}
                    <h4>Responsável</h4>
                    <Selects.Funcionarios id={editedData.assignee_id} handleInputChange={handleSelectChange} />
                    <hr />
                    <p> Criado em: {moment(editedData.created_at).format('D/m/Y H:s')}</p>
                    <hr />
                </div>

                <button type="submit" className="btn mt-3 btn-light w-100 text-black"> Editar </button>
                </form>
            </div>
        </div>
    );
};

export default Tarefa;
