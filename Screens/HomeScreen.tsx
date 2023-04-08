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
import { addTodo, checkTodo, getListGivenIndex, removeTodo } from "../state";
import { useAppDispatch, useAppSelector } from "../hooks";

export interface ITodo {
  id: string;
  title: string;
  checked: boolean;
}

type Props = NativeStackScreenProps<StackParameters, "TodoList">;

const HomeScreen = ({route}: Props) => {
  const idList = route.params.id;
  const list = useAppSelector(state => getListGivenIndex(state, idList));
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>("");

  const add = (text: string) => {
    dispatch(addTodo({idList: idList, text}));
    setText("");
  };

  const remove = (id: string) => {
    dispatch(removeTodo({idList: idList, idTodo: id}));
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
                dispatch(checkTodo({idList: idList, idTodo: item.id}))
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
              style={tw`items-center justify-center mr-2`}
              onPress={() => remove(item.id)}
            >
              <Icon name="closecircleo" type="ant-design" size={20} color="red" />
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
