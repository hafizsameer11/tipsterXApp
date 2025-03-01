import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Calendar from "@/componenetsUi/createTip/Calander";
import PasteInput from "@/componenetsUi/createTip/PasteInput";
import { ThemedText } from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";

const CreateTip = () => {
    const [matchDate, setMatchDate] = useState("");
    const [bookingCode, setBookingCode] = useState<string>("");
    const [numberCode, setnumberCode] = useState<string>("")

    return (
        <SafeAreaView style={{ paddingHorizontal: 15, flex: 1, justifyContent: "space-between" }}>
            <View style={{ gap: 20, paddingTop: 20 }}>
                <Calendar onDateSelect={(date: string) => setMatchDate(date)} />
                <PasteInput setBookingDate={setBookingCode} />
                <PasteInput setBookingDate={setnumberCode} placeholder="Number of Odds" />
                <ThemedText>
                    {matchDate ? `Match Date: ${matchDate}` : "Select a date"}
                </ThemedText>
                <ThemedText style={{ marginTop: 10 }}>
                    Booking Code: {bookingCode}
                </ThemedText>
                <View style={styles.alertCan}>
                    <Feather name="alert-circle" size={24} color="#FFFF00" />
                    <Text style={styles.alertText}>
                        Kindly note that all bookings are to placed two days before
                        the date of the games and you only submit code for games
                        played on the same day
                    </Text>
                </View>
            </View>
            <Pressable style={styles.createTipButton}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Create Tip</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default CreateTip;

const styles = StyleSheet.create({
    selectedDateText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    createTipButton: {
        backgroundColor: "#FFFF00",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    alertCan: {
        backgroundColor: "rgba(255, 255, 0, 0.5)",
        borderWidth: 2,
        borderColor: "#FFFF00",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    alertText:{
        color: "white",
        fontSize: 14,
        flex:1,
        textAlign:"justify"
    }
});