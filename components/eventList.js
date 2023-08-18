import { View, Text, TouchableWithoutFeedback, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';

var { width, height } = Dimensions.get('window');

export default function EventList({ title, hideSeeAll = false }) {

    const navigation = useNavigation();
    
    const handleClick = (item) => {
        // navigation.navigate('Film', item);
        console.log('clicked', item);
    }


    let events = [
        {
            id: 1,
            name: 'Event 1',
            image: require('../assets/images/poster1.jpg'),
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            date: '2021-09-01',
            time: '12:00',
            location: 'Location 1',
            invitees: ['user1', 'user2', 'user3'],
            commonWatchList: ['movie1', 'movie2', 'movie3'],
            price: 100,
            availableTickets: 100,
            totalTickets: 100,
            isFree: true,
            isOnline: true,
            isSoldOut: false,
            isOnSale: false,
            isUpcoming: false,
            isRecommended: false,
            isLiked: false,
            isBookmarked: false,
        },
        {
            id: 2,
            name: 'Event 2',
            image: require('../assets/images/poster1.jpg'),
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            date: '2021-09-01',
            time: '12:00',
            location: 'Location 2',
            invitees: ['user1', 'user2', 'user3'],
            commonWatchList: ['movie1', 'movie2', 'movie3'],
            price: 100,
            availableTickets: 100,
            totalTickets: 100,
            isFree: true,
            isOnline: true,
            isSoldOut: false,
            isOnSale: false,
            isUpcoming: false,
            isRecommended: false,
            isLiked: false,
            isBookmarked: false,
        },
        {
            id: 3,
            name: 'Event 3',
            image: 'https://picsum.photos/200/300',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            date: '2021-09-01',
            time: '12:00',
            location: 'Location 3',
            invitees: ['user1', 'user2', 'user3'],
            commonWatchList: ['movie1', 'movie2', 'movie3'],
            price: 100,
            availableTickets: 100,
            totalTickets: 100,
            isFree: true,
            isOnline: true,
            isSoldOut: false,
            isOnSale: false,
            isUpcoming: false,
            isRecommended: false,
            isLiked: false,
            isBookmarked: false,
        }
    ]

    return (
        <View className="mb-8 space-y-4">

            {/* Title */}
            <View className="flex-row justify-between items-center mx-4">
                <Text className="text-white text-xl">{title}</Text>

                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={styles.text} className="text-white text-xl">See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>

            {/* Films */}
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15}}
            >
                {
                    events?.map((event, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => handleClick(event)}
                            >
                                {/* Event Card */}
                                <View className="space-y-2 mr-6 pb-2 bg-neutral-300 rounded-3xl shadow-lg">

                                    {/* Poster */}
                                    <Image
                                        className="rounded-t-3xl"
                                        source={event.image}
                                        style={{ width: width * 0.54, height: height * 0.21}}
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
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}