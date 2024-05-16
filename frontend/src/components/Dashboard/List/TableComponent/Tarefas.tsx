import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableComponents from "./index";
import funcionarioData from "../../../../data/Funcionario";
import { dashboardActions } from "../../../../store/dashboard-slice";

const Tarefas = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.dashboard);
  const [funcionarios, setFuncionarios] = useState<any>([]);
  const [responsaveis, setResponsaveis] = useState<string[]>([]);

  useEffect(() => {
    if (selector.backupList.funcionarios.length === 0) {
      funcionarioData.all().then(async (data: any) => {
        if (data.ok && data !== undefined) {
          const responseJson = await data.json();
          if (responseJson) {
            dispatch(
              dashboardActions.setBackupData({
                listName: "funcionarios",
                data: responseJson,
              })
            );
            setFuncionarios(responseJson);
          }
        } else {
          setFuncionarios([]);
        }
      });
    } else {
      setFuncionarios(selector.backupList.funcionarios);
    }
  }, [dispatch, selector.backupList.funcionarios]);

  useEffect(() => {
    async function fetchResponsaveis() {
      const nomesResponsaveis = await Promise.all(
        selector.principalList.map(async (e: any) => {
          if (funcionarios.length !== 0) {
            const nome = await searchFuncionarioAndReturnName(e.assignee_id);
            return nome;
          }
          return "";
        })
      );
      setResponsaveis(nomesResponsaveis);
    }
    fetchResponsaveis();
  }, [funcionarios, selector.principalList]);

  async function searchFuncionarioAndReturnName(id: any) {
    if (funcionarios.length !== 0) {
      const funcionario = funcionarios.find((func: any) => func.id === id);
      return funcionario ? funcionario.first_name : "";
    }
    return "";
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Titulo</th>
            <th scope="col">Responsável</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        {selector.principalList.map((e: any, k: number) => {
          return (
            <tbody key={k}>
              <tr>
                <th scope="row">{k + 1}</th>
                <td>{e.title}</td>
                <td>{responsaveis[k]}</td> {/* Renderizar o nome do responsável */}
                <td>
                  <TableComponents.DeleteButton dbId={e.id} stateKey={k} />
                  <TableComponents.EditButton id={k} />
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
};

export default Tarefas;
