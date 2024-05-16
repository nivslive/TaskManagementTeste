import { useDispatch, useSelector } from "react-redux";
import EditModalComponents from './index';
import { useEffect, useState } from "react";
import Input from "./Input";
import moment from "moment";
import { dashboardActions } from "../../../store/dashboard-slice";
import tarefaData from "../../../data/Tarefa";
import departamentoData from "../../../data/Departamento";

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
    name: string,
    created_at: string,
    updated_at: string,
}
interface DashboardState {
    dashboard: { editData: EditDataState,},
}

const Departamento = () => {
    const selector = useSelector((state:DashboardState) => state.dashboard);
    const dispatch = useDispatch();

    
    const [editedData, setEditedData] = useState<EditDataState>({
        id: selector.editData.id,
        name: selector.editData.name,
        created_at: selector.editData.created_at,
        updated_at: selector.editData.updated_at
    });

    useEffect(() => {
        dispatch(dashboardActions.putEditedDataOnItem({editedData}));
        const body = {name: editedData.name};
        departamentoData.update(`/${editedData.id}`, body);
    }, [editedData]);

    function sendEditedData(e: any) {
        e.preventDefault();
        setEditedData((prevData) => ({
            ...prevData,
            [e.target.name.name]: e.target.name.value,
        }));
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div style={style.editModal}>
            <div style={style.editModal.container}>
                <EditModalComponents.CloseButton />
                <form onSubmit={sendEditedData}>
                <div style={style.modalContent}>
                    <h4>Departamento <br/> <i>{editedData.name}</i></h4>
                    <Input name="name" label="Edite o name:" value={editedData.name} onChange={handleInputChange} />
                    <p> Criado em: {moment(editedData.created_at).format('D/m/Y H:s')}</p>
                    <hr />
                </div>
                <button type="submit" className="btn mt-3 btn-light w-100 text-black"> Editar </button>
                </form>
            </div>
        </div>
    );
};

export default Departamento;
