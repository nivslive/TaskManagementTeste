import { useState } from "react";
import CloseButton from "./CloseButton";
import Input from "./Input";
import departamentoData from "../../../../data/Departamento";
import { useDispatch } from "react-redux";
import { dashboardActions } from "../../../../store/dashboard-slice";

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
 
 const Departamento = () => {
   const dispatch = useDispatch();
   const [data, setData] = useState({
     name: "",
   });
 
   const sendCreatedData = (e: any) => {
     e.preventDefault();
     departamentoData.create(data).then((e: any) => {
        dispatch(dashboardActions.closeCreateModal());
        dispatch(dashboardActions.putCreatedData(data));
     });
   };
 
   const handleInputChange = (e: any) => {
     const { name, value } = e.target;
     setData((prevData) => ({
       ...prevData,
       [name]: value,
     }));
   };
 
   return (
     <div style={style.editModal}>
       <div style={style.editModal.container}>
         <CloseButton />
         <form onSubmit={sendCreatedData}>
           <div style={style.modalContent}>
             {/* <Input
               name="name"
               label="Edite o nome:"
               value={data.name}
               onChange={handleInputChange}
             /> */}

             <h5 className="pb-2"> Crie um departamento </h5>
             <div className="d-block">
                <label className="me-2">name: </label>
                <input name="name"  onChange={handleInputChange}/>   
             </div> 
             <hr />
           </div>
           <button type="submit" className="btn mt-3 btn-light w-100 text-black">
             Criar
           </button>
         </form>
       </div>
     </div>
   );
 };
 
 export default Departamento;
 