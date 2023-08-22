import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image500 } from '../api/tmdb';
import { darkStyles, styles } from '../theme';

var { width, height } = Dimensions.get('window');

export default function Watchlist({ data, lightMode }) {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Film', {
            item: item, 
            isLightMode: lightMode
        });
    }
    return (
        <View className="mb-8">
            <Text className="font-bold text-xl mx-4 mb-5" style={lightMode?styles.text:darkStyles.text}>
                Watchlist
            </Text>
            <Carousel
                data={data}
                renderItem={({ item }) => <FilmCard item={item} handleClick={handleClick} />}
                firstItem={1}
                inactiveSlideOpacity={0.5}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    )
}


const FilmCard = ({ item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                source={{ uri: image500(item.poster_path) } || fallbackMoviePoster}
                style={{
                    width: width * 0.6,
                    height: height * 0.4
                }}
                className="rounded-3xl"
            />
        </TouchableWithoutFeedback>
    )
}