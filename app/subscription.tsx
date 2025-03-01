import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubscriptionHeader from '@/componenetsUi/subscription/SubscriptionHeader';
import PackageSelector from '@/componenetsUi/subscription/PackageSelector';
import SubscriptionSummary from '@/componenetsUi/subscription/SubscriptionSummary';
import FAQs from '../componenetsUi/subscription/Faqs';
import { View } from 'react-native';

const Subscription: React.FC = () => {

    const faqs = [
        { title: 'When will I be billed', content: 'You will be billed at the start of your subscription period.' },
        { title: 'Do I get promotions', content: 'You can get special promotions that are offered on some particular days or months.' }
    ];

    const [selectedPackage, setSelectedPackage] = useState<string>('monthly');
    const [activePackage, setActivePackage] = useState<string>('monthly'); // Mock active package

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            <SubscriptionHeader />
            <PackageSelector selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} />
            <SubscriptionSummary selectedPackage={selectedPackage} activePackage={activePackage} />
            <View style={{margin:20}}>
                <FAQs Faqs={faqs} heading={true} />
            </View>

        </SafeAreaView>
    );
};

export default Subscription;