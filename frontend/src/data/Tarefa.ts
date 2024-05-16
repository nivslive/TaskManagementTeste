import { FuncionarioState, TarefaState } from "../store/interfaces";
import Fetch from "./Fetch";
import { IData } from "./Interfaces";

class Tarefas extends Fetch implements IData {
    path: string;
    constructor(path: string) {
        super(path);
        this.path = path;
    }
    
    async create(content: any) {
        return await this.post(undefined, content);
    }

    async update(id: string, content: any) {
        return await this.put(id, content);
    }

    async  all() {
        return await this.get('/all');
    }

}

const tarefaData = new Tarefas('/tarefas');
export default tarefaData;