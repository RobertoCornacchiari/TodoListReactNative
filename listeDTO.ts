import { IList } from "./Screens/Lists";

export const listeIniziali: IList[] = [
  {
    id: 1,
    nome: "Vacanze",
    todos: [
      {
        id: "1",
        title: "Todo 1",
        checked: true,
      },
      {
        id: "2",
        title:
          "Questa è una della cose che nella giornata odierna ho da fare, mannaggia a chi so io",
        checked: false,
      },
    ],
  },
  {
    id: 2,
    nome: "Università",
    todos: [
      {
        id: "1",
        title: "Todo 1",
        checked: true,
      },
    ],
  },
];
