import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import ToDoItem from './ToDoItem';

//출력할 데이터를 todos 라는 이름으로 넘겨받습니다.
function ToDoList({todos, onToggle, onRemove}) {
    return (
        <FlatList 
        ItemSeparatorComponent={()=> <View style={styles.seperator}/>}
        style={styles.list}
        data={todos}
        renderItem={({item}) => (
            <ToDoItem id={item.id} text={item.text} done={item.done} onToggle={onToggle} onRemove={onRemove}/>
        )}
        keyExtractor = {item => item.id.toString()} />
    );
}

const styles = StyleSheet.create({
    list:{
        flex:1
    },
    seperator:{
        backgroundColor: '#e0e0e0',
        height:1
    }
});

export default ToDoList;
