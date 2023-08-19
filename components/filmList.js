import { View, Text, TouchableWithoutFeedback, ScrollView, Dimensions, Image } from 'react-native';
import React from 'react';
import { darkStyles, styles } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185 } from '../api/tmdb';

var { width, height } = Dimensions.get('window');

export default function FilmList({ title, data, isLightMode }) {

    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Film', item);
    }

    return (
        <View className="mb-8 space-y-4">

            {/* Title */}
            <View className="flex-row justify-between items-center mx-4 mb-1">
                <Text className="font-bold text-xl">
                    <Text style={!isLightMode?styles.text:darkStyles.text}>
                        {title}
                    </Text>
                </Text>
            </View>

            {/* Films */}
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15 }}
            >
                {
                    data.map((item, index) => {

                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => handleClick(item)} // bring to filmScreen
                            >
                                <View className="space-y-3 mr-4">
                                    <Image
                                        source={{ uri: image185(item.poster_path) } || fallbackMoviePoster}
                                        className="rounded-3xl"
                                        style={{ width: width * 0.33, height: height * 0.22 }}
                                    />
                                    <Text className="ml-2">
                                        <Text style={!isLightMode?styles.paragraph:darkStyles.paragraph}>
                                            {
                                                item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title
                                            }
                                        </Text>
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