import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    backBtn: {
        backgroundColor: "black",
        width: 40,
        height: 40,
        margin: 10,
        marginTop: 20,
        marginLeft: "5%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        flexDirection: "row",
        gap: 20,
        marginTop: 20,
        paddingHorizontal: "5%",
        marginBottom: 80
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    h1: {
        fontSize: 35,
        fontWeight: 900
    },
    badge: {
        flexDirection: 'row',
        gap: 5,
    },
    badgeImage: {
        width: 25,
        height: 25,
    },
    badgeText: {
        fontSize: 15,
        fontWeight: 600
    },
    subcription: {
        flexDirection: "row",
        gap: 10,
        backgroundColor: "white",
        padding: 5,
        borderRadius: 100
    },
    menuItem: {
        marginHorizontal: 20,
        backgroundColor: '#2B2B2B',
        padding: 20,
        paddingBlock:50,
        minHeight: 200,
        transform: [{ translateY: -50 }],
        borderRadius:10,
        gap:20
    },
    item:{
        alignItems:"center",
        backgroundColor:"#3f3f3f",
        flexDirection:"row",
        borderRadius:60,
        gap:10
    },
    ItemIcon:{
        width: 60,
        height: 60,
        borderRadius:50,
        backgroundColor:"#FFFF00",
        alignItems:'center',
        justifyContent:'center',
    },
    itemText:{
        fontSize: 20,
        color:'white'
    },
    footer:{
        marginHorizontal:20,
        gap:20,
    },
    footerbtn:{
        backgroundColor: "#2B2B2B",
        borderRadius: 10,
        padding: 20,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderColor:'#FFFFFF',
        borderWidth:2
    },
    footerbtnText:{
        color: "white",
        fontWeight:900,
        fontSize:20,
    },

})