import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/Loginstyle";
import FloatingLabelInput from "@/componenetsUi/login/floatingLabelInput";
import { useRouter } from "expo-router";

const ResetPassword = () => {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // ✅ Validation Schema
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
    });
    const handleCompleteSubmit = () => {
        Alert.alert("Success", "Your password has been reset!");
        router.push('/')
    }


    return (
        <SafeAreaView style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Add a new password</Text>

            <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    handleCompleteSubmit()
                    resetForm();
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ flex: 1, justifyContent: "space-between", paddingBottom: 20 }}>
                        <View>
                            {/* New Password Input */}
                            <FloatingLabelInput
                                label="New Password"
                                value={values.password}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                secureTextEntry={!passwordVisible}
                                error={touched.password && errors.password ? errors.password : undefined}
                            />

                            {/* Confirm Password Input */}
                            <FloatingLabelInput
                                label="Re-type Password"
                                value={values.confirmPassword}
                                onChangeText={handleChange("confirmPassword")}
                                onBlur={handleBlur("confirmPassword")}
                                secureTextEntry={!confirmPasswordVisible}
                                error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                            />
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity style={styles.loginButton} onPress={() => handleSubmit()}>
                            <Text style={styles.loginButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
};

export default ResetPassword;
