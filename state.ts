import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { IList } from "./Screens/Lists";
import { ITodo } from "./Screens/HomeScreen";
import { listeIniziali } from "./listeDTO";

//Stato iniziale dell'intera APP, di tutti gli slice, quidni liste è uno slice, avessi altro (ad esempio utenti) aggiungerei un'altra voce
export interface IStoreState {
  liste: IList[];
}

//Gestione del signolo slice "liste"
const initialState: IStoreState = {
  liste: listeIniziali,
};

interface CheckTodo {
  idList: number;
  idTodo: string;
}

interface NewTodo {
  idList: number;
  text: string;
}

//Creazione dello slice
export const listsSlice = createSlice({
  name: "TodoLists",
  initialState,
  //Qui dentro definisco tutte le funzioni di cui ho bisogno per modificare lo stato
  reducers: {
    addList: (old, action: PayloadAction<string>) => {
      old.liste.push({
        id: Math.random() * 1000000,
        nome: action.payload,
        todos: [] as ITodo[],
      });
    },
    checkTodo: (old, action: PayloadAction<CheckTodo>) => {
      old.liste
        .filter((lista) => lista.id === action.payload.idList)[0]
        .todos.filter((todo) => todo.id === action.payload.idTodo)[0].checked =
        !old.liste
          .filter((lista) => lista.id === action.payload.idList)[0]
          .todos.filter((todo) => todo.id === action.payload.idTodo)[0].checked;
    },
    addTodo: (old, action: PayloadAction<NewTodo>) => {
      old.liste
        .filter((lista) => lista.id === action.payload.idList)[0]
        .todos.push({
          id: ""+ Math.random() * 1000000,
          title: action.payload.text,
          checked: false,
        });
    },
    removeTodo: (old, action: PayloadAction<CheckTodo>) => {
      old.liste
        .filter((lista) => lista.id === action.payload.idList)[0]
        .todos = old.liste
        .filter((lista) => lista.id === action.payload.idList)[0]
        .todos.filter((todo) => todo.id !== action.payload.idTodo)
    },
  },
});

//Esporto tutte le funzioni
export const { addList, checkTodo, addTodo, removeTodo } = listsSlice.actions;

//Esporto funzioni aggiuntive che non modificano lo stato, banalmente i getter DI UNO SLICE COMPLETO PERÒ
export const getLists = (state: RootState) => state.lists.liste;

export const getListGivenIndex = (state: RootState, id: number) =>
  state.lists.liste.filter((lista) => lista.id === id)[0];

//Esporto di default il reducer
export default listsSlice.reducer;

//Esporto lo store che contiene tutti i reducer, uno per ogni slice (da usare per il Provider)
export const store = configureStore({
  reducer: {
    lists: listsSlice.reducer,
  },
});
//Definisco dei tipi per poter usare Typescript
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
