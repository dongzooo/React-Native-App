import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Pressable,
    Platform,
    Image,
    ActivityIndicator
} from 'react-native';
import { signOut } from '../lib/auth';
import { createUser } from '../lib/users';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import { launchImageLibrary } from 'react-native-image-picker';

import {useUserContext} from '../contexts/UserContext'


function SetupProfile() {
    //닉네임 변수
    const [displayName, setDisplayName] = useState('');
    //화면전환을 수행하는 navigator 찾아오기
    const navigation = useNavigation();

    const {setUser} = useUserContext();
    const [response, setResponse] = useState(null);
 
    //파라미터 생성
    const { params } = useRoute();

    const { uid } = params || {};

    const [loading, setLoading] = useState(false);


    //버튼을 눌렀을 때 firebase의 storeage에 저장
    const onSubmit = async () => {
        setLoading(true);

        let photoURL = null;

        if (response) {
            const asset = response.assets[0];
            const extension = asset.fileName.split('.').pop(); // 확장자 추출
            //업로드 할 경로 지정
            const reference = storage().ref(`/profile/${uid}.${extension}`);

            if (Platform.OS === 'android') {
                await reference.putString(asset.base64, 'base64', {
                    contentType: asset.type,
                });
            } else {
                await reference.putFile(asset.uri);
            }

            photoURL = response ? await reference.getDownloadURL() : null;
        }
        const user = {
            id: uid,
            displayName,
            photoURL
        }
        createUser(user)
        setUser(user)
    };

    const onCancel = () => {
        signOut();
        navigation.goBack();
    };

    const onSelectImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                maxWidth: 512,
                maxHeight: 512,
                includeBase64: Platform.OS === 'android',
            },
            res => {
                if(res.didCancel){
                    return
                }
                setResponse(res)
                console.log({ uri: response?.assets[0]?.uri })

            },
        );
    };

    return (        
        <View style={styles.block}>
            <Pressable  onPress={onSelectImage}>
            <Image style={styles.circle} source={response ? 
                {uri:response?.assets[0]?.uri} : require('../assets/user.png')} />
            </Pressable>

            <View style={styles.form}>
                <BorderedInput
                    placeholder="닉네임"
                    value={displayName}
                    onChangeText={setDisplayName}
                    onSubmitEditing={onSubmit}
                    returnKeyType="next"
                />
                {loading ? (
                    <ActivityIndicator size={32} color='#6200ee' style={styles.spinner} />
                ): (<View style = {styles.buttons}>
                <CustomButton title="다음" onPress={onSubmit} hasMarginBottom />
                <CustomButton title="취소" onPress={onCancel} theme="secondary" />
            </View>)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        alignItems: 'center',
        marginTop: 24,
        paddingHorizontal: 16,
        width: '100%',
    },
    circle: {
        backgroundColor: '#cdcdcd',
        borderRadius: 64,
        width: 128,
        height: 128,
    },
    form: {
        marginTop: 16,
        width: '100%',
    },
    buttons: {
        marginTop: 48,
    },
});

export default SetupProfile;