import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../config';
import firebase from 'firebase/compat/app';

const Otp = () => {
    
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setVerificationId);
            setPhoneNumber('');
    };

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase.auth().signInWithCredential(credential)
        .then(() => {
            setCode('');
        })
        .catch((error) => {
            alert(error);
        })
        Alert.alert(
            'Login feito com sucesso.'
        )
    }

    return (
        <View style={StyleSheet.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                />
                <Text style={styles.otpText}>
                    Login usando OTP
                </Text>
                <TextInput
                    placeholder='Telefone + DDI'
                    onChangeText={setPhoneNumber}
                    keyboardType='phone-pad'
                    autoCompleteType='tel'
                    style={styles.TextInput}
                />
                <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
                    <Text style={styles.buttonText}>
                        Enviar Verificacao
                    </Text>
                </TouchableOpacity>
                <TextInput
                     placeholder='Confirmar código'
                     onChangeText={setCode}
                     keyboardType='number-pad'
                     style={styles.TextInput}
                />
                 <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
                    <Text style={styles.buttonText}>
                        Confirmar Verificacao
                    </Text>
                </TouchableOpacity>
        </View>
    )
}

export default Otp;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextInput: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        fontSize: 24,
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
        marginBotton: 20,
        textAlign: 'center',
        color: '#000'
    },
    sendVerification: {
        padding: 20,
        backgroundColor: '#3498db',
        borderRadius: 10,
    },
    sendCode: {
        padding: 20,
        backgroundColor: '#9b59b6',
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold',
    },
    otpText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        margin: 20
    }
});