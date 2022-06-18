import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import DateHead from './components/DateHead'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'

import AddToDo from './components/AddToDo'
import Empty from './components/Empty'
import ToDoList from './components/ToDoList'

import todosStorage from './storages/todoStorage';

function App(){
  //오늘 날짜 생성
  const today = new Date();

  //데이터를 저장하기 위한 속성 생성
  const [todos, setTodos] = useState([
    {id:1, text:'작업 환경 설정', done:true},
    {id:2, text:'BackEnd - SpringBoot', done: true },
    {id:3, text:'FrontEnd - ReactNative', done: false },
  ])

  //데이터 불러오기ㅁ
  useEffect(()=>{
    //데이터를 가져온 후 setTodos 함수에 대입해서 수행
    todosStorage.get().then(setTodos).catch(console.error);
  }, [])

  //데이터 저장하기
  useEffect(()=>{
    todosStorage.set(todos).catch(console.error);
  }, [todos])

  //데이터를 삽입하기 위한 함수
  const onInsert = text => {
    //가장 큰 id를 찾아서 + 1
    const nextId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    //하나의 인스턴스 생성
    const todo = {
      id:nextId,
      text,
      done:false
    };
    //배열에 추가한 후 배열을 todos 에 대입
    setTodos(todos.concat(todo));
  }

  //done 의 값을 토글 시키기 위한 함수
  //id를 받아서 id에 해당하는 데이터를 찾아서 done 의 값을 토글 시키기
  const onToggle = id => {
    const nextTodos = todos.map(todo => todo.id === id ? {...todo, done:!todo.done}: todo);
    setTodos(nextTodos);
  }

  //데이터를 삭제하기 위한 함수
  const onRemove = id => {
    //매개변수로 넘어온 아이디가 아닌 것 만 골라서 nextToDos를 생성
    const nextToDos = todos.filter(todo => todo.id != id);
    setTodos(nextToDos)
  }


  return (
    <SafeAreaProvider>
    <SafeAreaView edges={['bottom']} style={styles.block} >
        <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.avoid}>
        <DateHead date={today} />
        {todos.length === 0 ? <Empty /> : <ToDoList todos={todos} onToggle={onToggle} onRemove={onRemove}/>}
        <AddToDo onInsert={onInsert}/>
        </KeyboardAvoidingView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({ 
  block:{
    flex:1
  },
  avoid:{
    flex:1
  }
});

export default App;