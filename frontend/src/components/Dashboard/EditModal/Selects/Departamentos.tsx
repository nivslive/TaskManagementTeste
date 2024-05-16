import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import departamentoData from "../../../../data/Departamento";
import { dashboardActions } from "../../../../store/dashboard-slice";

const Departamentos = (props: any) => {
    const dispatch = useDispatch();
    const selector = useSelector((state:any) => state.dashboard);
    const [departamentos, setDepartamentos] = useState<any>([]);
    useEffect(() => {
        let isMounted = true;

        if (selector.backupList.departamentos.length === 0) {
            departamentoData.all().then(async (data: any) => {
                if (isMounted && data.ok && data !== undefined) {
                    const responseJson = await data.json();
                    if (responseJson) {
                        dispatch(dashboardActions.setBackupData({listName: 'departamentos', data: responseJson}));
                        setDepartamentos(responseJson);
                    }
                } else {
                    setDepartamentos([]);
                }
            });
        } else {
            setDepartamentos(selector.backupList.departamentos);
        }

        return () => {
            isMounted = false;
        };
    }, [dispatch, selector.backupList.departamentos]);

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement> | any) => {
        props.handleInputChange(event);
    };
    return (
        <>
        {departamentos.length === 0 && <input name="department_id"  onChange={handleInputChange}/>  }
            {departamentos.length !== 0 && (
                <select className="form-control" name="department_id" onChange={handleInputChange}>
                    <option value="">Selecione um Funcionário</option>
                    {departamentos.map((departamento: any) => (
                        <option selected={props.id === departamento.id} key={departamento.id} value={departamento.id}>
                            {departamento.name}
                        </option>
                    ))}
                </select>
        )}
        </>
    )
};

export default Departamentos;