import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface LeaderboardItemProps {
    name: string;
    image: string;
    score: number;
    percentage: number;
    color: string;
    height: number;
}

const LeaderBoard: React.FC<LeaderboardItemProps> = ({ name, image, score, percentage, color, height }) => {
    return (
        <View style={[styles.card, { backgroundColor: color, height }]}>
            <Image source={{ uri: image }} style={styles.profileImage} />
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.score}>{score.toLocaleString()}</Text>
                <Text style={styles.percentage}>{percentage} %</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 10,
        flex:1
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'orange',
        position: 'absolute',
        top: -25,
    },
    name: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 35,
    },
    score: {
        color: 'gold',
        fontSize: 16,
        fontWeight: 'bold',
    },
    percentage: {
        color: 'white',
        fontSize: 12,
    },
    info:{
        flex:1,
        alignItems:'center',
        gap:5
    }
});

export default LeaderBoard;
