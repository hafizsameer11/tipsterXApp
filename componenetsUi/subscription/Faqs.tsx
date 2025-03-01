import React from 'react';
import { View, StyleSheet , Text } from 'react-native';
import FAQCollapsible from './FAQCollapsible';

type FAQ = {
    title: string,
    content: string,
}

type Props = {
    Faqs: FAQ[],
    // seetign heading default value
    heading?: boolean,
}

const FAQs: React.FC<Props> = ({ Faqs, heading }) => {
    return (
        <View>
            {heading && <Text style={styles.heading}>FAQs</Text>}
            {Faqs.map((faq, index) => (
                <FAQCollapsible key={index} faq={faq} />
            ))}
        </View>
    );
};

export default FAQs;

const styles = StyleSheet.create({
    heading:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        marginBottom:20,
    },
});
