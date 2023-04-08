import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { ITodo } from "./HomeScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParameters } from "../App";
import { Icon } from "@rneui/base";

import { getLists, addList } from "../state";
import { useAppDispatch, useAppSelector } from "../hooks";

export interface IList {
  id: number;
  nome: string;
  todos: ITodo[];
}

type Props = NativeStackScreenProps<StackParameters, "Lists">;

const ListsScreen = ({ navigation }: Props) => {
  const lists = useAppSelector(getLists);
  const dispatch = useAppDispatch();
  const [modalShown, setModalShown] = useState<boolean>(false);

  const [text, setText] = useState<string>("");

  const creaTodoList = () => {
    dispatch(addList(text));
    setModalShown(false);
  };

  return (
    <SafeAreaView style={tw`p-12 items-center flex-1`}>
      <Modal
        visible={modalShown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setModalShown(false);
        }}
      >
        <View
          style={tw`flex-1 items-center justify-center bg-neutral-50 opacity-90`}
        >
          <View style={tw`bg-orange-300 w-5/6 rounded-xl items-center p-4`}>
            <TextInput
              style={tw`h-10 border p-3 rounded-full border-white w-full mb-3 text-white`}
              value={text}
              onChangeText={setText}
              cursorColor="white"
            />
            <Pressable
              style={tw` border border-white p-2 rounded-full items-center justify-center`}
              onPress={creaTodoList}
            >
              <Text style={tw`text-white`}>Crea todolist</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Text style={tw`font-bold text-4xl mb-4`}>Lists</Text>

      <FlatList
        style={tw`w-full`}
        data={lists}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={tw`border items-center p-3 my-1 rounded-full flex-row justify-between`}
              onPress={() => navigation.navigate("TodoList", {
                id: item.id
              })}
            >
              <Text>{item.nome}</Text>
              <Text>{item.todos.length}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <Pressable
        style={tw`w-15 h-15 bg-orange-400 rounded-full items-center justify-center`}
        onPress={() => {
          setText("");
          setModalShown(true);
        }}
      >
        <Icon name="plus-square-o" type="font-awesome" size={32} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
};

export default ListsScreen;
