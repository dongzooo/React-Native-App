import React from 'react'
import {StyleSheet, View, Pressable, Text, Platform} from 'react-native'

//onPress 는 버튼을 눌렀을 때 수행할 동작
//title은 버튼의 타이틀
//hasMarginBottom 은 아래쪽 여백 설정을 위한 옵션
//theme는 버튼의 스타일을 위한 옵션


function CustomButton({onPress, title, hasMarginBottom, theme}){
    const isPrimary = theme === 'primary';

    return (
        <View style={[styles.block, hasMarginBottom && styles.margin]}>
            <Pressable
                onPress = {onPress}
                style={({pressed}) => [
                    styles.wrapper,
                    isPrimary && styles.primaryWrapper,
                    Platform.OS === 'ios' && pressed && {opacity:0.5}
                ]}
                android_ripple={{
                    color:isPrimary? '#ffffff':'#6200ee'
                }}>
                    <Text style={[styles.text, isPrimary ? styles.primaryText : styles.secondaryText]}>{title}</Text>
                </Pressable>
        </View>
    );
}

//기본값 설정
CustomButton.defaultProps = {
    theme:'primary'
}

const styles = StyleSheet.create({
    primaryWrapper:{
        backgroundColor:'#6200ee'
    },
    primaryText:{
        color:'white'
    },
    secondaryText:{
        color:'yellow'
    },

    overflow:{
        borderRadius:4,
        overflow:'hidden'
    },
    wrapper:{
        borderRadius:4,
        height:48,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#6200ee'
    },
    text:{
        fontWeight:'bold',
        fontSize:14,
        color:'white'
    },
    margin:{
        marginBottom:8
    }
});

export default CustomButton;