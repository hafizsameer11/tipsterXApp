import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/Loginstyle";
import FloatingLabelInput from "@/componenetsUi/login/floatingLabelInput";
import { Link, useRouter } from "expo-router";

const ForgetPassword = () => {
    const router = useRouter();
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Enter a valid email")
            .required("Email is required")
    });
    const handleCompleteSubmit = (value :string)=>{
        console.log("Login Data:", value);
        Alert.alert(value)
        router.push('/forgetPasswordCode')
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>Input e-mail address</Text>

            <Formik
                initialValues={{ email: ""}}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    handleCompleteSubmit(values.email)
                    resetForm();
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{flex:1,justifyContent:'space-between',paddingBottom:20}}>
                        {/* Email Input */}
                        <FloatingLabelInput
                            label="Input Email"
                            value={values.email}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            keyboardType="email-address"
                            error={touched.email && errors.email ? errors.email : undefined}
                        />

                        {/* Login Button */}
                        <TouchableOpacity style={styles.loginButton} onPress={()=>handleSubmit()}>
                            <Text style={styles.loginButtonText}>Proceed</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
};
export default ForgetPassword;
