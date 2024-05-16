import { useDispatch, useSelector } from "react-redux";
import { dashboardActions } from "../../store/dashboard-slice";
import tarefaData from "../../data/Tarefa";
import { useEffect, useState } from "react";
import departamentoData from "../../data/Departamento";
import funcionarioData from "../../data/Funcionario";
import { errorHandlerActions } from "../../store/error-handler-slice";

const Button = (props: any) => {
    const [showErrorMessageForUser, setShowErrorMessageForUser] = useState(false);
    const dispatch = useDispatch();
    const selector = useSelector((state: any) => state.dashboard);
    useEffect(() => {
        switch(selector.listName) {
            case 'tarefas':
                if(selector.backupList.tarefas.length !== 0) {
                    dispatch(dashboardActions.setListData({listName: selector.listName, data: selector.backupList.tarefas}));
                } else {
                    tarefaData.all().then((response) => {
                        if (response.status === 200) {
                            return response.json(); 
                        } else {
                            dispatch(errorHandlerActions.setShowErrorHandlerForDBReasonForTrue());
                            throw new Error("Erro na requisição"); 
                        }
                    }).then((data) => {
                        dispatch(dashboardActions.setListData({listName: props.name, data}));
                    }).catch((error) => {
                        console.error("Erro:", error);
                    });
                }
                break;
            case 'departamentos':
                if(selector.backupList.departamentos.length !== 0) {
                    dispatch(dashboardActions.setListData({listName: props.name, data: selector.backupList.departamentos}));
                } else {
                    departamentoData.all().then((response) => {
                        if (response.status === 200) {
                            return response.json(); 
                        } else {
                            throw new Error("Erro na requisição"); 
                        }
                    }).then((data) => {
                        dispatch(dashboardActions.setListData({listName: props.listName, data}));
                    }).catch((error) => {
                        dispatch(errorHandlerActions.setShowErrorHandlerForDBReasonForTrue());
                    });
                }
                break;

                case 'funcionarios':
                    if(selector.backupList.funcionarios.length !== 0) {
                        dispatch(dashboardActions.setListData({listName: props.name, data: selector.backupList.funcionarios}));
                    } else {
                        funcionarioData.all().then((response) => {
                            if (response.status === 200) {
                                return response.json(); 
                            } else {
                                throw new Error("Erro na requisição"); 
                            }
                        }).then((data) => {
                            dispatch(dashboardActions.setListData({listName: props.listName, data}));
                        }).catch((error) => {
                            console.error("Erro:", error);
                        });
                    }
                    break;
    }
    }, [selector.listName]);
    function switchList(e:any) {
        e.preventDefault();
        dispatch(dashboardActions.changeList({listName: props.name}));
    }
    return <a href="#" onClick={switchList}><button className={`btn pe-3 me-3 my-3 ` + (selector.listName === props.name ? `btn-primary` : `btn-dark`)}> {props.name} </button></a>
}

export default Button;