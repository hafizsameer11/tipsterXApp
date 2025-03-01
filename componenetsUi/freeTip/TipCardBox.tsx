import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type props = {
    text: string,
    isRed?: boolean
}

const TipCardBox = ({text,isRed} : props) => {
  return (
    <View style={[styles.box,isRed && {borderColor:"red"}]}>
      <Text style={[styles.boxText,isRed && {color:"red"}]}>{text}</Text>
    </View>
  )
}

export default TipCardBox

const styles = StyleSheet.create({
    box: {
        borderWidth:2,
        borderColor: '#ffff00',
        width:20,
        height:20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxText:{
        fontSize: 10,
        color:"white"
    }
})