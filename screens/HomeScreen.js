import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text className="text-red-500 text-4xl">RT</Text>
            <StatusBar style="auto" />
        </View>
    )
}