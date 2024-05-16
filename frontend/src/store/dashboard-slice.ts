import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ChangeListState {
  listName: any,
}

interface DataState {
    listName: String,
    principalList: any,
    backupList: any,
    editData: any,
    iCanSeeEditModal: boolean,
    iCanSeeCreateModal: boolean,
    editDataKey: number | null,
    // content: {
    //   funcionarios: FuncionarioState[] | [],
    //   tarefas: TarefaState[] | [] | any,
    //   departamentos: DepartamentoState[] | [],
    // },
}

const initialState: DataState = {
  listName: '',
  iCanSeeEditModal: false,
  iCanSeeCreateModal: false,
  principalList: [],
  backupList: {funcionarios: [], tarefas: [], departamentos: [],},
  editData: {},
  editDataKey: null,
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // CONFORME AQUI MUDA, TODO DASHBOARD MUDARÁ
    changeList: (state, action: PayloadAction<ChangeListState>) => {
      state.listName = action.payload.listName;
      if(state.iCanSeeEditModal) state.iCanSeeEditModal = false;
    },

    // AQUI SETA A LISTA SELECIONADA DO BACKUP PRA A PILHA PRINCIPAL
    setListData(state, action: PayloadAction<any>) {      
      
      // prepare backups
      if(state.listName === 'funcionarios' && state.backupList.funcionarios.length === 0) {
        state.backupList.funcionarios = action.payload.data;
      } else if(state.listName === 'tarefas' && state.backupList.tarefas.length === 0)  {
        state.backupList.tarefas = action.payload.data;
      } else if(state.listName === 'departamentos' && state.backupList.departamentos.length === 0) {
        state.backupList.departamentos = action.payload.data;
      }

      // inject backups on principal list
      if(state.listName === 'departamentos') {
        state.principalList = state.backupList.departamentos;
      } else if(state.listName === 'tarefas') {
        state.principalList = state.backupList.tarefas;
      } else if(state.listName === 'funcionarios') {
        state.principalList = state.backupList.funcionarios;
      }
    },
    setBackupData(state, action: PayloadAction<any>) {      
      if(action.payload.listName === 'funcionarios') {
        state.backupList.funcionarios = action.payload.data;
      } else if(action.payload.listName  === 'tarefas')  {
        state.backupList.tarefas = action.payload.data;
      } else if(action.payload.listName === 'departamentos') {
        state.backupList.departamentos = action.payload.data;
      }
    },
    searchByWord: (state, action: PayloadAction<any>) => {
      if(state.listName === 'funcionarios') {
        state.principalList = state.backupList.funcionarios;
        state.principalList = state.principalList.filter((item: any) =>
        item.first_name.toLowerCase().includes(action.payload.searchText.toLowerCase()));
      }
      if(state.listName === 'tarefas') {
        state.principalList = state.backupList.tarefas;
        state.principalList = state.principalList.filter((item: any) =>
          item.title.toLowerCase().includes(action.payload.searchText.toLowerCase()));
      }
      if(state.listName === 'departamentos') {
        state.principalList = state.backupList.departamentos;
        state.principalList = state.principalList.filter((item: any) =>
          item.name.toLowerCase().includes(action.payload.searchText.toLowerCase()));
      }


    },

    //EDIT RULES
    openEditModal: (state, action: PayloadAction<any>) => {
      state.editData = state.principalList[action.payload.id];
      state.editDataKey = action.payload.id;
      state.iCanSeeEditModal = true;
    },
    putEditedDataOnItem: (state, action: PayloadAction<any>) => {
      if(state.editDataKey === null) throw new Error('não existe essa chave na lista de dados.');
      state.principalList[state.editDataKey] = action.payload.editedData;
    },
    closeEditModal: (state) => {
      state.iCanSeeEditModal = false;
    }, 

    
    //DELETE RULES
    deleteItem: (state, action: PayloadAction<number>) => {
      const indexToDelete = action.payload;
      if (indexToDelete >= 0 && indexToDelete < state.principalList.length) {
        state.principalList.splice(indexToDelete, 1);
        if (state.editDataKey === indexToDelete) {
          state.iCanSeeEditModal = false;
          state.editDataKey = null;
        }
      }
    },

    //CREATE RULES
    openCreateModal: (state) => {
      state.iCanSeeCreateModal = true;
    },
    closeCreateModal: (state) => {
      state.iCanSeeCreateModal = false;
    }, 
    putCreatedData(state, action: PayloadAction<any>) {
      // Update both backupList and principalList
      if (state.listName === 'departamentos') {
        state.backupList.departamentos.push(action.payload);
        state.principalList = state.backupList.departamentos;
      } else if (state.listName === 'tarefas') {
        state.backupList.tarefas.push(action.payload);
        state.principalList = state.backupList.tarefas;
      } else if (state.listName === 'funcionarios') {
        state.backupList.funcionarios.push(action.payload);
        state.principalList = state.backupList.funcionarios;
      }
    },
    
    searchByFuncionario: (state, action: PayloadAction<any>) => {
      // only tarefas list
      if(state.listName === 'tarefas') {
        state.principalList = state.backupList.tarefas;
        if(!Number.isNaN(action.payload)) {
          state.principalList = state.principalList.filter((e: any) => e.assignee_id === action.payload)
        }
      }
    }
  },
})

export const dashboardActions: any = dashboardSlice.actions

export default dashboardSlice.reducer