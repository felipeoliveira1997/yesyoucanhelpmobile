import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        width: '100%'
    },
    viewContainer: {
        width: '100%',
        flex: 1,
        alignItems: "center"
    },
    LinearGradient: {
        width: '100%',
        height: '30%',
        alignItems: "center",
        position: "absolute",
        zIndex: -1
    },

    //cardImageContainer
    bodyCard: {
        display: "flex",
        alignItems: "center"
    },

    //scroll
    subContainerScroll: {
        width: '100%',
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingLeft: '2%'
    },

    containerInput: {
        display: "flex",
        width: '100%',
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: '2%'
    },

    view_1_input: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: '2.5%'
    },
    buttoncomponente: {
        width: '30%',
        height: 41,
        display: "flex",
        justifyContent: "center",
        color: "#000000",
        elevation: 5
    }
})