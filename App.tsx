import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListsScreen from "./Screens/Lists";
import HomeScreen from "./Screens/HomeScreen";

export type StackParameters = {
  Lists: undefined;
  TodoList: {id: number};
};

const Stack = createNativeStackNavigator<StackParameters>();

import { store } from "./state";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Lists" component={ListsScreen} />
          <Stack.Screen name="TodoList" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
