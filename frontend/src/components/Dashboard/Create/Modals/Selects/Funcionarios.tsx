import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import funcionarioData from "../../../../../data/Funcionario";
import { dashboardActions } from "../../../../../store/dashboard-slice";

const Funcionarios = ({handleInputChange}: any) => {
    const dispatch = useDispatch();
    const selector = useSelector((state:any) => state.dashboard);
    const [funcionarios, setFuncionarios] = useState<any>([]);
    useEffect(() => {
        if (selector.backupList.funcionarios.length === 0) {
            funcionarioData.all().then(async (data: any) => {
                if(data.ok && data !== undefined) {
                    const responseJson = await data.json();
                    if(responseJson) {
                        dispatch(dashboardActions.setBackupData({listName: 'funcionarios', data: responseJson}));
                        setFuncionarios(await responseJson)
                    }
                }
                else {
                    setFuncionarios([]);
                }
            });
        } else {
            setFuncionarios(selector.backupList.funcionarios);
        }
    }, [dispatch, selector.backupList.funcionarios]);
    return (
        <>
        {funcionarios.length === 0 && <input name="assignee_id"  onChange={handleInputChange}/>  }
            {funcionarios.length !== 0 && (
                <select className="form-control" name="assignee_id" onChange={handleInputChange}>
                        <option value="">Selecione um Funcionário</option>
                        {funcionarios.map((funcionario: any) => (
                            <option key={funcionario.id} value={funcionario.id}>
                                {funcionario.first_name}
                            </option>
                        ))}
                </select>
        )}
        </>
    )
};

export default Funcionarios;