import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

function BorderedInput({hasMarginBottom, ...rest}, ref){
    return (<TextInput style={[styles.input, hasMarginBottom && StyleSheet.margin]} 
    
    ref = {ref}

    {...rest}/>);
}

const styles = StyleSheet.create({
    input:{
        borderColor:"#bdbdbd",
        borderWidth:1,
        paddingHorizontal:16,
        borderRadius:4,
        height:48,
        backgroundColor:'white'
    },
    margin:{
        marginBottom:16
    }
})

//ref에 BorderedInput을 대입해서 넘겨줍니다.
export default React.forwardRef(BorderedInput);