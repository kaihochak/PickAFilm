import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { fallbackPersonImage, image342 } from '../api/tmdb';
import { darkStyles, styles } from '../theme';

var { width, height } = Dimensions.get('window');

export default function Cast({ cast, navigation, lightMode }) {

    const handleClick = (person) => {
        navigation.navigate('Person', {
            item: person,
            isLightMode: lightMode
        });
    }


    return (
        <View className="my-6">
            {/* Title */}
            <Text className="font-bold text-xl mx-4 mb-5" style={lightMode ? styles.text : darkStyles.text}>Cast</Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 5 }}
            >
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                className="mr-2 px-1 items-center"
                                onPress={()=>handleClick(person)}
                            >
                                <View
                                    className="overflow-hidden items-center "
                                    style={{ height: height * 0.18, width: width * 0.27 }}
                                >
                                    <Image
                                        className="h-36 w-24 rounded-xl"
                                        source={person?.profile_path ? { uri: image342(person?.profile_path) } : fallbackPersonImage}
                                    />
                                </View>
                                <Text className="text-s mt-1 pt-1" style={lightMode ? styles.paragraph.text : darkStyles.paragraph}>
                                    {person?.character.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character}
                                </Text>
                                <Text className="text-xs mt-1" style={lightMode ? styles.paragraph.text : darkStyles.paragraph}>
                                    {person?.original_name.length > 12 ? person?.original_name.slice(0, 12) + '...' : person?.original_name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}