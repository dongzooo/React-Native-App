import React, {useState} from "react";
import {View, StyleSheet, TextInput, Image,
     TouchableOpacity, Platform, TouchableNativeFeedback,
    Keyboard} from 'react-native'

function AddToDo({onInsert}){
    //text 라는 속성을 생성하고 setText 라는 함수로 수정을 하고 기본값은 ''
    const [text, setText] = useState('');
    console.log(text);

    //버튼을 누르거나 Return Key를 눌렀을 때 호출되는 함수
    const onPress = () =>{
        onInsert(text);
        setText("");
        Keyboard.dismiss();
    }

    return (
        <View style={styles.block}>
            <TextInput placeholder="수행할 내용을 입력하세요!!!" style={styles.input} 
            value={text} onChangeText={setText} returnKeyType="done"
            onSubmitEditing={onPress}/> 

            {Platform.OS === 'ios' ? (
                <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
                    <View style={styles.buttonStyle}>
                        <Image source={require('../assets/icons/add_white/add_white.png')} />
                    </View>
                </TouchableOpacity>
            ) : (
                <View style={styles.circleWrapper}>
                <TouchableNativeFeedback onPress={onPress}>
                    <View style={styles.buttonStyle}>
                        <Image source={require('../assets/icons/add_white/add_white.png')} />
                    </View>
                </TouchableNativeFeedback>
                </View>
            )}

        </View>
    )
}

const styles=StyleSheet.create({
    circleWrapper:{
        overflow: 'hidden',
        borderRadius: 24
    },
    block:{
        backgroundColor:'white',
        height:64,
        paddingHorizontal:16,
        borderColor: "#bdbdbd",
        borderTopWidth:1,
        borderBottomWidth:1,
        justifyContent:'center',
        flexDirection:'row'
    },
    input:{
        fontSize:16,
        paddingVertical: 8,
        flex: 1
    },
    buttonStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        height: 48,
        backgroundColor: '#26a69a',
        borderRadius: 24
    }
})

export default AddToDo;