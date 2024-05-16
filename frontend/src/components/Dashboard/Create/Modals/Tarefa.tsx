import { useState } from "react";
import tarefaData from "../../../../data/Tarefa";
import CloseButton from "./CloseButton";
import { dashboardActions } from "../../../../store/dashboard-slice";
import { useDispatch } from "react-redux";
import Modals from ".";
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
 
const Tarefa = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
    title: "",
    assignee_id: null,
    });

    const sendCreatedData = (e: any) => {
        e.preventDefault();
        tarefaData.create(data).then((e:any) => {
            const updatedData = {
                ...data,
                assignee_id: data.assignee_id !== null ? Number(data.assignee_id) : null,
            };
        
            dispatch(dashboardActions.closeCreateModal());
            dispatch(dashboardActions.putCreatedData(updatedData));
        });
    };

    const handleInputChange = (e: any) => {
    const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectAssigneeId = (e:any) => {
        setData((prevData) => ({
            ...prevData,
            assignee_id: e.target.value,
        }));
    }
    return (
        <div style={style.editModal}>
            <div style={style.editModal.container}>
                <CloseButton />
                <form onSubmit={sendCreatedData}>
                <div style={style.modalContent}>
                <h5 className="pb-2"> Crie uma tarefa: </h5>
                    <div className="d-block">
                        <label className="me-2">title: </label>
                        <input name="title"  onChange={handleInputChange}/>   
                    </div> 

                    <div className="flex column mt-3">
                        <label className="me-2">funcionáio (assignee_id): </label>
                        <Modals.Selects.Funcionarios handleInputChange={handleSelectAssigneeId} />
                    </div> 
                    <hr />
                    <hr />
                </div>

                <button type="submit" className="btn mt-3 btn-light w-100 text-black"> Criar </button>
                </form>
            </div>
        </div>
    )

};

export default Tarefa;