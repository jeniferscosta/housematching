import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
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
    buttonText: {
        color: '#fff',
        fontSize: 18,
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
    skipButtonText: {
        color: '#000',
        fontSize: 16,
    },
    nextButton: {
        backgroundColor: '#8BC83F',
    },
    registerButton: {
        backgroundColor: '#8BC83F',
        fontFamily: 'Lato',
        fontSize: 16,
        color: '#1F4C6B',
        marginTop: 20,
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
});

export default commonStyles;