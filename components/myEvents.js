import { View, Text, TouchableWithoutFeedback, Dimensions, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image342, image500 } from '../api/tmdb';
import { darkStyles, styles } from '../theme';
import { PlusIcon } from 'react-native-heroicons/outline';
import Loading from './loading';

var { width, height } = Dimensions.get('window');
var borderColor;

export default function MyEvents({ data, lightMode }) {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Film', {
            item: item,
            isLightMode: lightMode
        });
    }
    const [loading, setLoading] = useState(false);


    // set color
    const borderColor = lightMode ? styles.border.borderColor : darkStyles.border.borderColor;
    const textColor = lightMode ? styles.text.color : darkStyles.text.color;
    const paragraphColor = lightMode ? styles.paragraph.color : darkStyles.paragraph.color;

    return (
        <View className="mb-4 space-y-5">


            <View className="flex-row justify-between items-center border-y px-8 py-4" style={{ borderColor: borderColor }}>
                {/* Title */}
                <Text className="font-base text-2xl" style={{ color: textColor }}>
                    My Events
                </Text>
                {/* Create Event */}
                <TouchableWithoutFeedback onPress={() => navigation.navigate('CreateEvent')}>
                    <PlusIcon size="30" strokeWidth={2} color={textColor} />
                </TouchableWithoutFeedback>
            </View>

            {/* Events */}
            {
                loading ? (
                    <Loading lightMode={lightMode} />
                ) :
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
                                        <View className="space-y-1 mr-2 ml-4">
                                            <Image
                                                source={item?.poster_path ? { uri: image342(item.poster_path) } : fallbackMoviePoster}
                                                className="rounded border-[1px]"
                                                style={{
                                                    width: width * 0.80,
                                                    height: height * 0.25,
                                                    borderColor: borderColor
                                                }}
                                            />
                                            {/* Title */}
                                            <View className="flex-row justify-between items-center px-1 pt-2">
                                                <Text
                                                    className="text-[18px] font-normal"
                                                    style={{ color: textColor }}
                                                >
                                                    {item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
                                                </Text>
                                                <View className="border rounded-full px-3 py-1">
                                                    <Text
                                                        className="font-light text-[10px]"
                                                        style={{ color: textColor, borderColor: textColor }}
                                                    >
                                                        RSVP
                                                    </Text>
                                                </View>
                                            </View>
                                            {/* info */}
                                            <View className="flex-row justify-between items-center p-1">
                                                <Text
                                                    className="text-[15px] font-light"
                                                    style={{ color: paragraphColor }}
                                                >
                                                    Kai's House
                                                </Text>
                                                <Text
                                                    className="text-[15px] font-light"
                                                    style={{ color: paragraphColor }}
                                                >
                                                    2023.08.08{"   "} 8:00 PM
                                                </Text>
                                            </View>

                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                    </ScrollView>
            }

        </View>
    )
}

const FilmCard = ({ item, handleClick }) => {

    return (
        <TouchableWithoutFeedback
            key={item.id}
            onPress={() => handleClick(item)}>
            <Image
                source={item?.poster_path ? { uri: image500(item.poster_path) } : fallbackMoviePoster}
                style={{
                    width: width * 0.5,
                    height: height * 0.34,
                    borderColor: borderColor
                }}
                className="rounded-xl border-[1px]"
            />
        </TouchableWithoutFeedback>
    )

}