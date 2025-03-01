import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/Loginstyle";
import FloatingLabelInput from "@/componenetsUi/login/floatingLabelInput";
import { styles as timerstyle }  from "@/styles/verifyStyle";

const ForgetPasswordCode = () => {
  const [timer, setTimer] = useState(30); // Initial countdown
  const [codeSent, setCodeSent] = useState(false);

  // ⏳ Countdown Timer for Resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // 📩 Resend Code Handler
  const handleResendCode = () => {
    setTimer(30); // Reset timer
    setCodeSent(true);
    Alert.alert("A new code has been sent to your email.");
  };

  // ✅ Validation Schema
  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .matches(/^\d{5}$/, "Enter a valid 5-digit code")
      .required("Code is required"),
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter the verification code</Text>

      <Formik
        initialValues={{ code: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          Alert.alert("Submitted Code:", values.code);
          resetForm();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={{ flex: 1, justifyContent: "space-between", paddingBottom: 20 }}>
            {/* Code Input */}
            <FloatingLabelInput
              label="Enter Code"
              value={values.code}
              onChangeText={handleChange("code")}
              onBlur={handleBlur("code")}
              keyboardType="number-pad"
              error={touched.code && errors.code ? errors.code : undefined}
            />

            {/* Timer / Resend Code */}
            {timer > 0 ? (
              <Text style={timerstyle.timerText}>
                Code will be resent in{" "}
                <Text style={timerstyle.timerNumber}>{timer}s</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResendCode}>
                <Text style={[timerstyle.timerText, { color: "#FFD700" }]}>
                  Resend Code
                </Text>
              </TouchableOpacity>
            )}

            {/* Proceed Button */}
            <TouchableOpacity style={styles.loginButton} onPress={()=>handleSubmit()}>
              <Text style={styles.loginButtonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ForgetPasswordCode;
