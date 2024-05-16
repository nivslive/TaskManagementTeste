import { useDispatch, useSelector } from "react-redux";
import TableComponents from "./index";
import { useEffect, useState } from "react";
import departamentoData from "../../../../data/Departamento";
import { dashboardActions } from "../../../../store/dashboard-slice";
const Funcionarios = () => {
    let selector = useSelector((state: any) => state.dashboard);
    const dispatch = useDispatch();
    const [departamentos, setDepartamentos] = useState<any>([]);
    const [deps, setDeps] = useState<any>([]);
  
    useEffect(() => {
      if (selector.backupList.departamentos.length === 0) {
        departamentoData.all().then(async (data: any) => {
          if (data.ok && data !== undefined) {
            const responseJson = await data.json();
            if (responseJson) {
              dispatch(
                dashboardActions.setBackupData({
                  listName: "departamentos",
                  data: responseJson,
                })
              );
              setDepartamentos(responseJson);
            }
          } else {
            setDepartamentos([]);
          }
        });
      } else {
        setDepartamentos(selector.backupList.departamentos);
      }
    }, [dispatch, selector.backupList.departamentos]);
  
    useEffect(() => {
        async function fetchDepartamentos() {
          const fetchedDepartamentos = await Promise.all(
            selector.principalList.map(async (e: any) => {
              if (departamentos.length !== 0) {
                const nome = await searchDepartamentoAndReturnName(e.department_id);
                return { id: e.department_id, name: nome };
              }
              return { id: e.department_id, name: "" };
            })
          );
      
          const depsMap: any = {};
          fetchedDepartamentos.forEach((dep: any) => {
            depsMap[dep.id] = dep.name;
          });
      
          setDeps(depsMap);
        }
        fetchDepartamentos();
      }, [departamentos, selector.principalList]);
  
    async function searchDepartamentoAndReturnName(id: any) {
      if (departamentos.length !== 0) {
        const departamento = departamentos.find((func: any) => func.id === id);
        return departamento ? departamento.name : "";
      }
      return "";
    }

    return (<>
    <table className="table">
    <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Primeiro nome</th>
                <th scope="col">Departamento</th>
                <th scope="col">Opções</th>
                </tr>
    </thead>
    {   selector.principalList.map((e: any, k: number) => {
           return(
           <>
            <tbody key={k}>
                <tr>
                <th scope="row">{k + 1}</th>
                <td>{e.first_name}</td>
                <td>{deps[e.department_id]}</td>
                <td>
                    <TableComponents.DeleteButton dbId={e.id} stateKey={k} />
                    <TableComponents.EditButton id={k}/>
                </td>
                </tr>
            </tbody>

           </>
           )
        })
    }
    </table>
</>)};

export default Funcionarios;