import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    button: {
        width: 190,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 27,
        marginBottom: 20,
    },
    skipButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 86,
        height: 38,
        backgroundColor: '#DFDFDF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    nextButton: {
        marginTop: 20,
    },
    registerButton: {
        marginBottom: 20,
    },
    forgotPassword: {
        color: '#1F4C6B',
        fontSize: 16,
        marginTop: 20,
    },
    showPassword: {
        color: '#1F4C6B',
        fontSize: 16,
        marginTop: 20,
    },
    input: {
        width: '100%',
        padding: 8,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        fontSize: 12,
        fontFamily: 'Lato',
    },
    label: {
        color: '#234F68',
        fontSize: 12,
        fontFamily: 'Lato',
        marginTop: 20,
    },
    termsConditions: {
        color: '#1F4C6B',
        fontSize: 12,
        marginTop: 20,
    },
    resendCode: {
        color: '#1E90FF',
        marginTop: 20,
        textDecorationLine: 'underline',
    },
    disabled: {
        color: 'gray',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    title: {
        fontSize: 25,
        color: '#1F4C6B',
        fontFamily: 'Lato',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#1F4C6B',
        fontFamily: 'Lato',
        textAlign: 'center',
        marginBottom: 16,
    },
    finish: {
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Lato',
    },
    skipButtonText: {
        color: '#1F4C6B',
        fontSize: 16,
        fontFamily: 'Lato',
    },
    backButtonImage: {
        width: 30,
        height: 30,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    otpBox: {
        position: 'relative',
        width: 50,
        height: 50,
    },
    otpImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    selectedOtpImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderColor: '#1E90FF',
        borderWidth: 2,
    },
    otpInput: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        fontSize: 18,
        color: 'black',
        backgroundColor: 'transparent',
    },
});

export default commonStyles;