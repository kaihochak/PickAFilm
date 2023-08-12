import { View, Text, TouchableWithoutFeedback, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';

var {width, height} = Dimensions.get('window');

export default function TrendingFilms({title, data}) {
    
    let filmName = 'the best movie ever';
    const navigation = useNavigation(); 
    const handleClick = () => {
        navigation.navigate('Film', item);
    }

    return (
        <View className="mb-8 space-y-4">
            
            {/* Title */}
            <View className="flex-row justify-between items-center mx-4">
                <Text className="text-white text-xl">{title}</Text>
                <TouchableOpacity>
                    <Text style={styles.text} className="text-white text-xl">See All</Text>
                </TouchableOpacity>
            </View>

            {/* Films */}
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingLeft: 15}}
            >
                {
                    data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback 
                                key={index}
                                onPress={handleClick}
                            >
                                <View className="space-y-1 mr-4">
                                    <Image
                                        source={require('../assets/images/poster1.jpg')}
                                        className="rounded-3xl"
                                        style={{width: width*0.33, height: height*0.22}}
                                    />
                                    <Text className="text-neutral-300 ml-1">
                                        {
                                            filmName.length > 14 ? filmName.slice(0, 14) + '...' : filmName
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}