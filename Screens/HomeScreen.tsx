import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParameters } from "../App";
import { checkTodo, getListGivenIndex } from "../state";
import { useAppDispatch, useAppSelector } from "../hooks";

export interface ITodo {
  id: string;
  title: string;
  checked: boolean;
}

type Props = NativeStackScreenProps<StackParameters, "TodoList">;

const HomeScreen = ({route}: Props) => {
  const list = useAppSelector(state => getListGivenIndex(state, route.params.id));
  const dispatch = useAppDispatch();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [text, setText] = useState<string>("");

  const add = (text: string) => {
    setTodos((prev) =>
      prev.concat({
        id: "" + Math.random() * 1000000,
        title: text,
        checked: false,
      })
    );
    setText("");
  };

  const remove = (id: string) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView
      style={tw`flex-1 bg-white items-center justify-center p-6 pt-12`}
    >
      <Text style={tw`text-4xl font-bold pb-4`}>{list.nome}</Text>
      <FlatList
        data={list.todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={tw`flex-row p-2 items-center ${item.checked ? 'opacity-60' : ''}`}>
            <BouncyCheckbox
            isChecked={item.checked}
              onPress={() => {
                dispatch(checkTodo({idList: route.params.id, idTodo: item.id}))
              }}
            />
            <Text
              style={[
                item.checked ? tw`line-through text-gray-400` : null,
                {
                  flexShrink: 1,
                  width: "80%",
                },
              ]}
            >
              {item.title}
            </Text>
            <Pressable
              style={tw`h-5 w-5 items-center justify-center rounded-full bg-red-500 mr-2`}
              onPress={() => remove(item.id)}
            >
              <Icon name="minus" type="feather" size={14} color="#fff" />
            </Pressable>
          </View>
        )}
      />
      <View style={tw`flex-row p-2 items-center`}>
        <TextInput
          style={tw`h-10 w-60 m-3 border p-3 rounded-full`}
          value={text}
          onChangeText={setText}
        />
        <Pressable
          style={[
            tw`h-10 items-center justify-center w-10 rounded-full`,
            {
              backgroundColor: "#f09f48",
            },
          ]}
          onPress={() => add(text)}
        >
          <Icon name="plus" type="feather" size={20} color="#fff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
