import { View, Text, TouchableWithoutFeedback, ScrollView, Dimensions, Image } from 'react-native';
import React from 'react';
import { darkStyles, styles } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image342 } from '../api/tmdb';

var { width, height } = Dimensions.get('window');

export default function FilmList({ title, data, lightMode }) {

    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.push('Film', {
            item: item,
            isLightMode: lightMode
        });
    }

    const borderColor = lightMode ? styles.border.borderColor : darkStyles.border.borderColor;

    return (
        <View className="mb-3 space-y-3">

            {/* Title */}
            <View className="flex-row justify-between items-center mx-4 ">
                <Text className="font-bold text-xl">
                    <Text style={lightMode ? styles.text : darkStyles.text}>
                        {title}
                    </Text>
                </Text>
            </View>

            {/* Films */}
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 10 }}
            >
                {
                    data.map((item, index) => {

                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => handleClick(item)} // bring to filmScreen
                            >
                                <View className="space-y-1 mr-2">
                                    <Image
                                        source={item?.poster_path ? { uri: image342(item.poster_path) } : fallbackMoviePoster}
                                        className="rounded border-[1px]"
                                        style={{
                                            width: width * 0.26,
                                            height: height * 0.18,
                                            borderColor: borderColor
                                        }}
                                    />
                                    <Text
                                        className="ml-1 text-[10px] font-light"
                                        style={lightMode ? styles.paragraph : darkStyles.paragraph}
                                    >
                                        {item.title.length > 15 ? item.title.slice(0, 15) + '...' : item.title}
                                    </Text>

                                    <Text
                                        className="ml-1 text-[10px] font-light"
                                        style={lightMode ? styles.paragraph : darkStyles.paragraph}
                                    >
                                        5/10
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