import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image500 } from '../api/tmdb';
import { darkStyles, styles } from '../theme';
import { PlusIcon } from 'react-native-heroicons/outline';


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

    // set color
    borderColor = lightMode ? styles.border.borderColor : darkStyles.border.borderColor;
    textColor = lightMode ? styles.text.color : darkStyles.text.color;

    return (
        <View className="mb-4">
            <View className="flex-row justify-between items-center border-y px-8 py-4" style={{borderColor: borderColor}}>
                {/* Title */}
                <Text className="font-base text-2xl" style={{color: textColor}}>
                    My Events
                </Text>
                {/* Create Event */}
                <TouchableWithoutFeedback onPress={() => navigation.navigate('CreateEvent')}>
                    <PlusIcon size="30" strokeWidth={2} color={textColor}/>
                </TouchableWithoutFeedback>
            </View>
            <Carousel
                data={data}
                renderItem={({ item }) => <FilmCard item={item} handleClick={handleClick} />}
                firstItem={2}
                inactiveSlideOpacity={0.8}
                sliderWidth={width}
                itemWidth={width * 0.5}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
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