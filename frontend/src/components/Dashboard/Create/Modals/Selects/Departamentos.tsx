import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import departamentoData from "../../../../../data/Departamento";
import { dashboardActions } from "../../../../../store/dashboard-slice";

const Departamentos = ({handleInputChange}: any) => {
    const dispatch = useDispatch();
    const selector = useSelector((state:any) => state.dashboard);
    const [departamentos, setDepartamentos] = useState<any>([]);
    useEffect(() => {
        if (selector.backupList.departamentos.length === 0) {
            departamentoData.all().then(async (data: any) => {
                if(data.ok && data !== undefined) {
                    const responseJson = await data.json();
                    if(responseJson) {
                        dispatch(dashboardActions.setBackupData({listName: 'departamentos', data: responseJson}));
                        setDepartamentos(await responseJson)
                    }
                }
                else {
                    setDepartamentos([]);
                }
            });
        } else {
            setDepartamentos(selector.backupList.departamentos);
        }
    }, [dispatch, selector.backupList.departamentos]);
    return (
        <>
        {departamentos.length === 0 && <input name="department_id"  onChange={handleInputChange}/>  }
            {departamentos.length !== 0 && (
                <select name="department_id" onChange={handleInputChange}>
                        <option value="">Selecione um Departamento</option>
                        {departamentos.map((departamento: any) => (
                            <option key={departamento.id} value={departamento.id}>
                                {departamento.name}
                            </option>
                        ))}
                </select>
        )}
        </>
    )
};

export default Departamentos;