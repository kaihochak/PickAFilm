import { View, Text, TouchableWithoutFeedback, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';
import EventCard from './eventCard';

var { width, height } = Dimensions.get('window');

export default function EventCardList({ title, hideSeeAll = false }) {

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
                            <EventCard event={event}/>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}