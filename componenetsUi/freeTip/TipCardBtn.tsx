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
      {/* Odds Box (Smallest) */}
      <View style={[styles.btnCan, styles.smallBox]}>
        <Text style={styles.btnText}>{odds}</Text>
      </View>

      {/* Wallet Box (Middle Size) */}
      <View style={[styles.btnCan, styles.mediumBox]}>
        {wallet.image ? (
          <Image source={{ uri: wallet.image }} alt={"logo"} style={styles.walletLogo} />
        ) : (
          <View style={styles.circle}></View>
        )}
        <Text style={styles.walletBtnText}>{wallet.name}</Text>
      </View>

      {/* Code Box (Largest) */}
      <View style={[styles.btnCan, styles.largeBox, { backgroundColor: "#ffff00" }]}>
        <Text style={[styles.cpbtnText, { color: "black" }]}>{code}</Text>
        <Pressable onPress={handleCopy}>
          <Ionicons name='copy-outline' size={22} />
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
    marginVertical: 10,
  },

  /* Odds Box */
  smallBox: {
    flex: 1, /* Smallest Box */
  },

  /* Wallet Box */
  mediumBox: {
    flex: 1, /* Medium Box */
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  /* Code Box */
  largeBox: {
    flex: 1.5, /* Largest Box */
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },

  btnCan: {
    borderColor: "#ffff00",
    borderWidth: 2,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    fontSize: 10,
    color: "white",
    fontWeight: '900',
  },
  cpbtnText: {
    fontSize: 14,
    color: "white",
    fontWeight: '900',
  },

  walletLogo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  walletBtnText: {
    fontSize: 12,
    color: "white",
    fontWeight: '900',
  },

  circle: {
    width: 20,
    height: 20,
    borderRadius: 25 / 2,
    backgroundColor: "#ffff00",
  },
});
