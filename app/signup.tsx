import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import FloatingLabelInput from "@/componenetsUi/login/floatingLabelInput";
import DateOfBirthInput from "@/componenetsUi/signup/dateOfBirthInput";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/signupStyle";

type FormDataType = {
    username: string,
    phone: string,
    email: string,
    day: string,
    month: string,
    year: string,
    nationality: string,
    password: string,
}

const Register = () => {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const currentYear = new Date().getFullYear();
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        phone: Yup.string()
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, "Must be at least 10 digits")
            .required("Phone number is required"),
        email: Yup.string().email("Enter a valid email").required("Email is required"),
        day: Yup.number()
            .typeError("Day must be a number")
            .integer("Day must be a whole number")
            .min(1, "Day must be at least 1")
            .max(31, "Day cannot exceed 31")
            .required("Day is required"),
        month: Yup.number()
            .typeError("Month must be a number")
            .integer("Month must be a whole number")
            .min(1, "Month must be at least 1")
            .max(12, "Month cannot exceed 12")
            .required("Month is required"),
        year: Yup.number()
            .typeError("Year must be a number")
            .integer("Year must be a whole number")
            .min(1900, "Year must be at least 1900") // Set a minimum reasonable year
            .max(currentYear, `Year cannot exceed ${currentYear}`)
            .required("Year is required"),
        nationality: Yup.string().required("Nationality is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });
    const handleSubmit = (value: FormDataType) => {
        console.log("Register Data:", value);
        router.push("/verifyEmail")
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.subtitle}>Create an account</Text>

            <Formik
                initialValues={{
                    username: "",
                    phone: "",
                    email: "",
                    day: "",
                    month: "",
                    year: "",
                    nationality: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values)
                    resetForm();
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <FloatingLabelInput
                            label="Username"
                            value={values.username}
                            onChangeText={handleChange("username")}
                            onBlur={handleBlur("username")}
                            error={touched.username && errors.username ? errors.username : undefined}
                        />

                        <FloatingLabelInput
                            label="Phone number"
                            value={values.phone}
                            onChangeText={handleChange("phone")}
                            onBlur={handleBlur("phone")}
                            keyboardType="phone-pad" error={touched.phone && errors.phone ? errors.phone : undefined} />

                        <FloatingLabelInput
                            label="Email"
                            value={values.email}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            keyboardType="email-address"
                            error={touched.email && errors.email ? errors.email : undefined}
                        />

                        {/* Date of Birth Input */}
                        <DateOfBirthInput
                            day={values.day}
                            month={values.month}
                            year={values.year}
                            onChange={(field, value) => {
                                handleChange(field)(value); // Ensure Formik updates the state correctly
                            }}
                            onBlur={(field) => {
                                handleBlur(field); // Ensure Formik registers blur event correctly
                            }}
                            errors={{ day: errors.day, month: errors.month, year: errors.year }}
                            touched={{ day: touched.day, month: touched.month, year: touched.year }}
                        />


                        <FloatingLabelInput
                            label="Nationality"
                            value={values.nationality}
                            onChangeText={handleChange("nationality")}
                            onBlur={handleBlur("nationality")}
                            error={touched.nationality && errors.nationality ? errors.nationality : undefined}
                        />

                        <View style={styles.passwordContainer}>
                            <FloatingLabelInput
                                label="Password"
                                value={values.password}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                secureTextEntry={!passwordVisible}
                                error={touched.password && errors.password ? errors.password : undefined}
                            />
                            <TouchableOpacity style={styles.eyeIcon} onPress={() => setPasswordVisible(!passwordVisible)}>
                                <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.registerButton} onPress={()=>handleSubmit()}>
                            <Text style={styles.registerButtonText}>Register</Text>
                        </TouchableOpacity>

                        <Text style={styles.registerText}>
                            Already have an account? <Link href={"/login"} style={styles.registerLink}>Login</Link>
                        </Text>
                    </>
                )}
            </Formik>
        </SafeAreaView>
    );
};

export default Register;
