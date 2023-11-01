import { View, Text, TouchableWithoutFeedback, Dimensions, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image342, image500 } from '../api/tmdb';
import { darkStyles, styles } from '../theme';
import { PlusIcon, PlusCircleIcon } from 'react-native-heroicons/outline';
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

            <View className="flex-row justify-between items-center border-b py-4" style={{ borderColor: borderColor }}>
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
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 2 }}
                    >
                        {
                            // display latest 2 events
                            data.slice(0,2).map((item, index) => {

                                return (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => handleClick(item)} // bring to filmScreen
                                    >
                                        <View className="flex flex-row gap-8 pb-8">
                                            <Image
                                                source={item?.poster_path ? { uri: image342(item.poster_path) } : fallbackMoviePoster}
                                                className="rounded-xl border-[1px]]"
                                                style={{
                                                    width: width * 0.30,
                                                    height: height * 0.15,
                                                    borderColor: borderColor
                                                }}
                                            />
                                            {/* Info */}
                                            <View>
                                                {/* Title */}
                                                <View className="flex-row justify-between items-center pt-2">
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
                                                {/* Details */}
                                                <View className="flex-row justify-between items-center ">
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

                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                        
                        {/* Create Event Button */}
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('CreateEvent')}>
                            <View className="flex-row justify-center items-center px-8 py-4">
                                <PlusCircleIcon size="45" strokeWidth={1} color={textColor} />
                            </View>
                        </TouchableWithoutFeedback>
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