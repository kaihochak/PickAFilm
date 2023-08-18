import { View, Text, Dimensions, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

var { width, height } = Dimensions.get('window');

export default function EventCard({ event }) {

    const navigation = useNavigation();

    const handleClick = (event) => {
        navigation.navigate('Event', event);
        console.log('clicked', event);
    }
    
    return (

        <View>
            <Text>Event Card</Text>
            <TouchableWithoutFeedback
                key={event.index}
                onPress={() => handleClick(event)}
            >
                <View className="space-y-2 mr-6 pb-2 bg-neutral-300 rounded-3xl shadow-lg">

                    {/* Poster */}
                    <Image
                        className="rounded-t-3xl"
                        source={event.image}
                        style={{ width: width * 0.54, height: height * 0.21 }}
                    />

                    {/* Event name */}
                    <View className="px-2 pb-1">
                        <Text className="text-black-300 ml-1">
                            {event?.name.length > 14 ? event.title.slice(0, 14) + '...' : event.name}
                        </Text>
                    </View>

                    {/* Event Description */}
                    <View className="px-2 pb-1">
                        <Text className="text-black-300 ml-1">
                            {event?.description.length > 14 ? event.description.slice(0, 14) + '...' : event.description}
                        </Text>
                    </View>

                    {/* Event Date */}
                    <View className="px-2 pb-1">
                        <Text className="text-black-300 ml-1">
                            {event?.date.length > 14 ? event.date.slice(0, 14) + '...' : event.date}
                        </Text>
                    </View>

                    {/* Film Rating */}
                    <View className="px-2 pb-1">
                        <Text className="text-black-300 ml-1">
                            {event?.time.length > 14 ? event.time.slice(0, 14) + '...' : event.time}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback> 
        </View>


    )
}