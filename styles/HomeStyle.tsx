import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        position: "relative"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBlock: 20
    },
    logo: {
        maxWidth: 100,
        height: 60,
        objectFit: "contain",
    },
    headerRight: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    rCan: {
        backgroundColor: "#3f3f3f",
        padding: 10,
        paddingBlock: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    r: {
        color: 'black',
        backgroundColor: "#FFFF00",
        paddingInline: 15,
        paddingBlock: 5,
        borderRadius: 10,
        fontWeight: 900,
        fontSize: 20
    },
    rNumber: {
        color: "white",
        fontSize: 15,
        paddingInline: 10,
        paddingBlock: 5,
        fontWeight: 900
    },
    headerProfile: {
        width: 53,
        height: 53,
        borderRadius: 10
    },
    headerNotifitcation: {
        paddingInline: 15,
        paddingBlock: 15,
        borderRadius: 10,
        backgroundColor: "#3f3f3f"
    },
    postCan: {
        flex: 1,
    },
    createpostCan: {
        backgroundColor: "#FFFF00",
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 70,
        borderRadius: 70,
    },
    createpost: {
        position: "fixed",
        zIndex: 10,
        bottom: 170,
        left: '80%'
    }


})