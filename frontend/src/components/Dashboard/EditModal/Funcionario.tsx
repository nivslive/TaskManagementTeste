import { useDispatch, useSelector } from "react-redux";
import EditModalComponents from './index';
import { useEffect, useState } from "react";
import Input from "./Input";
import moment from "moment";
import { dashboardActions } from "../../../store/dashboard-slice";
import funcionarioData from "../../../data/Funcionario";
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
    first_name: string,
    last_name: string,
    phone: number,
    email: string,
    department_id: number,
    created_at: string,
    updated_at: string,
}
interface DashboardState {
    dashboard: { editData: EditDataState,},
}

const Funcionario = () => {
    const selector = useSelector((state:DashboardState) => state.dashboard);
    const dispatch = useDispatch();

    
    const [editedData, setEditedData] = useState<EditDataState>({
        id: selector.editData.id,
        first_name: selector.editData.first_name,
        last_name: selector.editData.last_name,
        phone: selector.editData.phone,
        email: selector.editData.email,
        department_id: selector.editData.department_id,
        created_at: selector.editData.created_at,
        updated_at: selector.editData.updated_at
    });

    useEffect(() => {
        dispatch(dashboardActions.putEditedDataOnItem({editedData}));
        const body = {first_name: editedData.first_name, last_name: editedData.last_name, phone: editedData.phone, email: editedData.email, department_id: editedData.department_id};
        funcionarioData.update(`/${editedData.id}`, body);
    }, [dispatch, editedData]);

    function sendEditedData(e: any) {
        e.preventDefault();
        setEditedData((prevData) => ({
            ...prevData,
            [e.target.first_name.name]: e.target.first_name.value,
            [e.target.last_name.name]: e.target.last_name.value,
            [e.target.phone.name]: e.target.phone.value,       
            [e.target.email.name]: e.target.email.value,          
            department_id: Number(e.target.department_id.value),
        }));
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSelectChange = (event: React.ChangeEvent<any>) => {
        setEditedData((prevData) => ({
            ...prevData,
            department_id: Number(event.target.value)
        }));
    };

    return (
        <div style={style.editModal}>
            <div style={style.editModal.container}>
                <EditModalComponents.CloseButton />
                <form onSubmit={sendEditedData}>
                <div style={style.modalContent}>
                    <h4>Funcionario <br/> <i>{editedData.first_name} {editedData.last_name}</i></h4>
                    <Input name="first_name" label="Edite o first_name:" value={editedData.first_name} onChange={handleInputChange} />
                    <Input name="last_name" label="Edite o last_name:" value={editedData.last_name} onChange={handleInputChange} />
                    <Input name="phone" label="Edite a phone:" value={editedData.phone} onChange={handleInputChange} />
                    <Input name="email" label="Edite o email:" value={editedData.email} onChange={handleInputChange} />
                    {/* <Input name="department_id" label="Edite o department_id:" value={editedData.department_id} onChange={handleInputChange} /> */}
                    <label> Troque o departamento: </label>
                    <Selects.Departamentos id={editedData.department_id} handleInputChange={handleSelectChange} />
                    <p> Criado em: {moment(editedData.created_at).format('D/m/Y H:s')}</p>
                    <hr />
                </div>

                <button type="submit" className="btn mt-3 btn-light w-100 text-black"> Editar </button>
                </form>
            </div>
        </div>
    );
};

export default Funcionario;
