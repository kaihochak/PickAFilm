import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { fallbackPersonImage, image342 } from '../api/tmdb';
import { darkStyles, styles } from '../theme';

export default function Cast({cast, navigation, lightMode}) {

  return (
    <View className="my-6">
        {/* Title */}
        <Text className="font-bold text-xl mx-4 mb-5" style={lightMode?styles.text:darkStyles.text}>Cast</Text> 
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 25 }}
        >
            {
                cast && cast.map((person, index) => {
                    return (
                        <TouchableOpacity 
                            key={index} 
                            className="mr-4 px-1 items-center"
                            onPress={() => navigation.navigate('Person', {person})}
                        >
                            <View
                                className="overflow-hidden 
                                            rounded-full items-center 
                                            border border-neutral-300" 
                            >
                                <Image
                                    className="rounded-full h-28 w-28"
                                    source={{uri: image342(person?.profile_path || fallbackPersonImage )}}
                                />
                            </View>
                            <Text className="text-s mt-1 pt-2" style={lightMode?styles.paragraph.text:darkStyles.paragraph}>
                                { person?.character.length > 18? person?.character.slice(0, 18) + '...': person?.character }
                            </Text>
                            <Text className="text-xs mt-1" style={lightMode?styles.paragraph.text:darkStyles.paragraph}>
                                { person?.original_name.length > 20? person?.original_name.slice(0, 20) + '...': person?.original_name }
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    </View>
  )
}