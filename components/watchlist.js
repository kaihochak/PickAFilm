import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image500 } from '../api/tmdb';
import { darkStyles, styles } from '../theme';

var { width, height } = Dimensions.get('window');
var borderColor;

export default function Watchlist({ data, lightMode }) {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Film', {
            item: item,
            isLightMode: lightMode
        });
    }
    borderColor = lightMode ? styles.border.borderColor : darkStyles.border.borderColor;

    return (
        <View className="mb-4">
            <Text
                className="font-bold text-xl mx-4 mb-5"
                style={lightMode ? styles.text : darkStyles.text}>
                Trending
            </Text>
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