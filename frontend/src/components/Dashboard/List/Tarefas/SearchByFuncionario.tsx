import { useDispatch, useSelector } from 'react-redux';
import { dashboardActions } from '../../../../store/dashboard-slice';
import { useState } from 'react';

const SearchByFuncionario = () => {
    const dispatch = useDispatch();
    const funcionarios = useSelector((state: any) => state.dashboard.backupList.funcionarios);
    const [selectedAssigneeId, setSelectedAssigneeId] = useState<any>(null);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(e.target.value);
        setSelectedAssigneeId(selectedId);
        dispatch(dashboardActions.searchByFuncionario(selectedId));
    };

    return (
        <div className="ms-auto pe-3 d-flex align-items-center">
            <select className="form-control" value={selectedAssigneeId || ''} onChange={handleSelectChange}>
                <option value="">Selecione um Funcionário</option>
                {funcionarios.map((funcionario: any) => (
                    <option key={funcionario.id} value={funcionario.id}>
                        {funcionario.first_name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SearchByFuncionario;
