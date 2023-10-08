import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import React, { useState } from 'react';
import { darkStyles, styles } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image342 } from '../api/tmdb';
import { ChevronRightIcon } from 'react-native-heroicons/outline';

const { width, height } = Dimensions.get('window');

export default function EventList({ title, data, lightMode }) {

    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.push('Film', {
            item: item,
            isLightMode: lightMode
        });
    }

    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All'); // Initialize with 'All'
    const dataToDisplay = showAll ? data : data.slice(0, 4);

    // Filter events based on the selected category
    const filteredData = selectedCategory === 'All' ? data : data.filter(item => item.category === selectedCategory);

    // set color
    const borderColor = lightMode ? styles.border.borderColor : darkStyles.border.borderColor;
    const textColor = lightMode ? styles.text.color : darkStyles.text.color;
    const paragraphColor = lightMode ? styles.paragraph.color : darkStyles.paragraph.color;

    return (
        <View className="mb-3 space-y-3">

            {/* Title */}
            <View className="flex-row justify-between items-center border-y px-8 py-4"
                style={{ borderColor: borderColor }}>
                {/* title */}
                <Text className="font-base text-2xl" style={{ color: textColor }}>{title}</Text>
                {/* show all */}
                <TouchableWithoutFeedback onPress={() => navigation.navigate('CreateEvent')}>
                    <ChevronRightIcon size="30" strokeWidth={2} color={textColor} />
                </TouchableWithoutFeedback>
            </View>

            {/* Filter buttons */}
            <View className="flex-row px-4 pt-2">
                <FilterButton title="All" onPress={() => setSelectedCategory('All')}
                    isSelected={selectedCategory === 'All'} />
                <FilterButton title="Film" onPress={() => setSelectedCategory('Film')}
                    isSelected={selectedCategory === 'Film'} />
                <FilterButton title="Music" onPress={() => setSelectedCategory('Music')}
                    isSelected={selectedCategory === 'Music'} />
                <FilterButton title="Others" onPress={() => setSelectedCategory('Others')}
                    isSelected={selectedCategory === 'Others'} />
            </View>

            {/* Events */}
            {
                // loading page
                loading ? (
                    <Loading lightMode={lightMode} />
                ) :
                    // results page
                    data.length > 0 ? (

                        // show the results
                        // <ScrollView
                        //     showsVerticalScrollIndicator={false}
                        //     contentContainerStyle={{ paddingHorizontal: 15 }}
                        //     className="space-y-3"
                        // >
                        <View className="flex-row justify-between flex-wrap px-4">
                            {dataToDisplay.map((item, index) => {
                                return (
                                    <TouchableWithoutFeedback
                                        key={index}
                                        onPress={() => handleClick(item)}
                                    >
                                        <View className="my-2">
                                            {/* Image */}
                                            <Image
                                                source={item?.poster_path ? { uri: image342(item.poster_path) } : fallbackMoviePoster}
                                                className=""
                                                style={{ width: width * 0.44, height: height * 0.3 }}
                                            />
                                            {/* Title */}
                                            <View className="flex-row justify-between items-center pt-3 pb-1">
                                                <Text
                                                    className="text-[14px] font-light"
                                                    style={{ color: textColor }}
                                                >
                                                    {item.title.length > 12 ? item.title.slice(0, 12) + '...' : item.title}
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
                                            {/* Info */}
                                            <View className="space-y-1 pb-2">
                                                <Text
                                                    className="text-[10px] font-light"
                                                    style={{ color: paragraphColor }}
                                                >
                                                    Kai's House
                                                </Text>
                                                <Text
                                                    className="text-[10px] font-light"
                                                    style={{ color: paragraphColor }}
                                                >
                                                    2023.08.08{"   "} 8:00 PM
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                            })}
                            {data.length > 4 && !showAll && (
                                <TouchableWithoutFeedback onPress={() => navigation("")}>
                                    <View className="my-2" style>
                                        <Text
                                            className="text-[14px] font-base"
                                            style={{ color: textColor }}
                                        >
                                            Show More
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                        </View>
                        // </ScrollView>
                    ) : (
                        // no results
                        <View className="flex-row justify-center">
                            {/* <Text className="text-white font-semibold ml-1">Results ({results.length})</Text> */}
                        </View>
                    )
            }

            {/* <ScrollView
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
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView> */}
        </View>
    )
}

function FilterButton({ title, onPress, isSelected }) {
    const buttonStyle = isSelected ?
        { backgroundColor: styles.title.color, textColor: 'white' } :
        { backgroundColor: 'white' };

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View className="rounded-full px-3 py-1"
                style={[
                    { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginRight: 10 },
                    buttonStyle
                ]}>
                <Text
                    className="font-base text-[16px]"
                    style={{ color: buttonStyle.textColor }}
                >
                    {title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}