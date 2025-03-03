import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '@/styles/menustyle'
import { AntDesign, FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'


type Props = {
    title: string
    icon: string
    iconBg: string
    navigatingLink: string
    iconType: string,
    type?: string
}

const iconComponents = {
    AntDesign,
    FontAwesome,
    FontAwesome5,
    MaterialIcons
};

const Item = ({ title, icon, iconBg, navigatingLink, iconType }: Props) => {
    const IconComponent = iconComponents[iconType as keyof typeof iconComponents];

    return (
        <Link href={navigatingLink as any} style={styles.item}>
            <View style={styles.item}>
                <View style={[styles.ItemIcon, { backgroundColor: iconBg }]}>
                    <IconComponent name={icon as keyof typeof IconComponent.glyphMap} size={30} color={"black"} />
                </View>
                <Text style={styles.itemText}>{title}</Text>
            </View>
        </Link>
    )
}

export default Item