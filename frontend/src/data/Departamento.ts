import Fetch from "./Fetch";
import { IData } from "./Interfaces";

class Departamento extends Fetch implements IData {
    path: string;
    constructor(path: string) {
        super(path);
        this.path = path;
    }

    async create(content: any) {
        return await this.post(undefined, content);
    }

    delete(id: any): any {
        return this.delete(`/${id}`);
    }

    async update(id: string, content: any) {
        return await this.put(id, content);
    }

    async  all() {
        return await this.get('/all');
    }


}

const departamentoData = new Departamento('/departamentos');
export default departamentoData;