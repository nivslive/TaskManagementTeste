interface IData {
    path: string;
    create(content: any): any;
    update(id: string, content: any): any;
    delete(id: string): any;
    all(): any;
}
// interface IFuncionario extends IData {}

// interface ITarefa extends IData {}

// interface IDepartamento extends IData {}


export type {IData};