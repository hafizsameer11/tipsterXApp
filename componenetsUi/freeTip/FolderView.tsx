import { StyleSheet, Text, View } from 'react-native'
import React, { Children } from 'react'
import Svg, { Path } from 'react-native-svg'

type props = {
    children: React.ReactNode,
}
const FolderView = ({ children }: props) => {
    return (
        <View style={styles.tipCan} >
            <Svg viewBox="0 0 402 203" fill="none" preserveAspectRatio="none" style={styles.shape}>
                <Path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C4.47715 0 0 4.47715 0 10V31.5991V34V193C0 198.523 4.47716 203 10 203H392C397.523 203 402 198.523 402 193V41.5991C402 36.0762 397.523 31.5991 392 31.5991H258.599C246.67 31.5991 237 21.9288 237 10V10C237 4.47715 232.523 0 227 0H10Z" fill="#2B2B2B" />
            </Svg>
            {children}
        </View>
    )
}

export default FolderView

const styles = StyleSheet.create({
    tipCan: {
        width: '100%',
        position: "relative",
    },
    shape: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
})