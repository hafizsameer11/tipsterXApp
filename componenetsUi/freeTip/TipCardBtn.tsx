import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

interface TipCardBtnProps {
  odds: string;
  wallet: {
    image?: any;
    name: string;
  };
  code: string;
}

const TipCardBtn: React.FC<TipCardBtnProps> = ({ odds, wallet, code }) => {
  const handleCopy = () => {
    Clipboard.setStringAsync(code);
  };

  return (
    <View style={styles.bottomCan}>
      <View style={styles.btnCan}>
        <Text style={styles.btnText}>{odds}</Text>
      </View>
      <View style={[styles.btnCan, styles.walletBtn]}>
        {wallet.image ? <Image source={{uri : wallet.image}} alt={"logo"} style={styles.walletLogo} />: (
            <View style={styles.circle}></View>
        )}
        <Text style={styles.walletBtnText}>{wallet.name}</Text>
      </View>
      <View style={[styles.btnCan, styles.walletBtn, { backgroundColor: "#ffff00" }]}>
        <Text style={[styles.btnText, { color: "black" }]}>{code}</Text>
        <Pressable onPress={handleCopy}>
          <Ionicons name='copy-outline' size={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default TipCardBtn;

const styles = StyleSheet.create({
  bottomCan: {
    flexDirection: 'row',
    gap: 10,
    marginBlock: 10
  },
  btnCan: {
    borderColor: "#ffff00",
    borderWidth: 2,
    padding: 10,
    flex: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    fontSize: 12,
    color: "white",
    fontWeight: '900'
  },
  walletLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  walletBtn: {
    flexDirection: "row",
    gap: 10,
  },
  walletBtnText: {
    fontSize: 12,
    color: "white",
    fontWeight: '900'
  },
  circle:{
    width: 30,
    height: 30,
    borderRadius: 30/2,
    backgroundColor: "#ffff00"
  }
});