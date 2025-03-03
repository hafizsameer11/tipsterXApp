import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Calendar from "@/componenetsUi/createTip/Calander";
import PasteInput from "@/componenetsUi/createTip/PasteInput";
import { Feather } from "@expo/vector-icons";
import CompanyDropDown from "@/componenetsUi/createTip/CompanyDropDown";
import CategoryDropDown from "@/componenetsUi/createTip/CategoryDropDown";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { AddTip } from "@/utils/mutations/TipAdd";
import { useAuth } from "@/contexts/authContext";
import { ApiError } from "@/utils/customApiCall";
import { showTopToast } from "@/utils/helpers";
import { useRouter } from "expo-router";

const CreateTip = () => {
    const route = useRouter();
    const { token, userData } = useAuth();
    const validationSchema = Yup.object().shape({
        matchDate: Yup.string().required("Match date is required"),
        bookingCode: Yup.string().matches(/^[a-zA-Z0-9]{6}$/, "Booking code should 5 letter atoz 1to9"),
        ods: Yup.string().required("Number of odds is required"),
        company: Yup.string().required("Company is required"),
        category: Yup.array().min(1, "At least one category is required"),
    });

    const { mutate: handleAddTip, isPending: addPostPending } = useMutation({
        mutationKey: ["addtip"],
        mutationFn: ({ formdata, token }: { formdata: any; token: string }) => AddTip(formdata, token),
        onSuccess: async (data) => {
            const result = data?.data;
            console.log("API Response:", result);
            route.push("/(tabs)")
        },
        onError: (error: ApiError) => {
            showTopToast({
                type: "error",
                text1: "Error",
                text2: error.message,
            });
        },
    });

    const handleSubmit = (values: any) => {
        const formdata = {
            codes: values.bookingCode,
            ods: values.ods,
            betting_company_id: values.company,
            betting_category: values.category.join(","),
            match_date: values.matchDate,
        };
        console.log("FormData:", formdata); // Debugging log
        handleAddTip({ formdata, token });
    };

    return (
        <SafeAreaView style={{ paddingHorizontal: 15, flex: 1 }}>
            <Formik
                initialValues={{
                    matchDate: "",
                    bookingCode: "",
                    ods: "",
                    company: "",
                    category: [],
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <>
                        <View style={{ gap: 20, paddingTop: 20 }}>
                            <Calendar
                                onDateSelect={(date: string) => setFieldValue("matchDate", date)}
                            />
                            {touched.matchDate && errors.matchDate && (
                                <Text style={styles.errorText}>{errors.matchDate}</Text>
                            )}

                            <CompanyDropDown
                                onSelect={(company: string) => setFieldValue("company", company)}
                            />
                            {touched.company && errors.company && (
                                <Text style={styles.errorText}>{errors.company}</Text>
                            )}

                            <PasteInput
                                setBookingDate={(code: string) => setFieldValue("bookingCode", code)}
                            />
                            {touched.bookingCode && errors.bookingCode && (
                                <Text style={styles.errorText}>{errors.bookingCode}</Text>
                            )}

                            <CategoryDropDown
                                onSelect={(categories: string[]) => setFieldValue("category", categories)}
                            />
                            {touched.category && errors.category && (
                                <Text style={styles.errorText}>{errors.category}</Text>
                            )}

                            <PasteInput
                                setBookingDate={(code: string) => setFieldValue("ods", code)}
                                placeholder="Number of Odds"
                            />
                            {touched.ods && errors.ods && (
                                <Text style={styles.errorText}>{errors.ods}</Text>
                            )}

                            <View style={styles.alertCan}>
                                <Feather name="alert-circle" size={24} color="#FFFF00" />
                                <Text style={styles.alertText}>
                                    Kindly note that all bookings are to be placed two days before
                                    the date of the games and you only submit code for games
                                    played on the same day
                                </Text>
                            </View>
                        </View>
                        <Pressable style={styles.createTipButton} disabled={addPostPending} onPress={handleSubmit}>
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>{addPostPending ? "Creating..." : "Create Tip"}</Text>
                        </Pressable>
                    </>
                )}
            </Formik>
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
        marginVertical: 20
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
    alertText: {
        color: "white",
        fontSize: 14,
        flex: 1,
        textAlign: "justify",
    },
    errorText: {
        color: "red",
        fontSize: 12,
    },
});