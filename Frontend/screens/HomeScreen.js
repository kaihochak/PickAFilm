import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { Bars3Icon } from 'react-native-heroicons/solid';
import { MoonIcon, SunIcon } from 'react-native-heroicons/solid';
import { styles, darkStyles } from '../theme';
import MyEvents from '../components/myEvents';
import { useState } from 'react';
import { fetchWatchlist, fetchTopRated, fetchTrending, fetchUpcoming } from '../api/tmdb'
import Loading from '../components/loading';
import { useNavigation } from '@react-navigation/native';
import EventList from '../components/eventList';

const ios = Platform.OS === 'ios';
const baseMargin = ios ? 'mb-2' : 'mb-3';

export default function HomeScreen() {

    const navigation = useNavigation();
    const [lightMode, setLightMode] = useState(true);
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // call api, fetch data
    useEffect(() => {
        getTrending();
        getTopRated();
        getUpcoming();
    }, []);

    // fetch data for trending films
    const getTrending = async () => {
        const data = await fetchTrending();
        if (data && data.results) setTrending(data.results);
        setLoading(false);
    }

    // fetch data for top rated films
    const getTopRated = async () => {
        const data = await fetchTopRated();
        if (data && data.results) setTopRated(data.results);
        setLoading(false);
    }

    // fetch data for upcoming films
    const getUpcoming = async () => {
        const data = await fetchUpcoming();
        if (data && data.results) setUpcoming(data.results);
        setLoading(false);
    }

    // go to search screen
    const goToSearch = () => {
        console.log(lightMode);
        navigation.push('Search', {
            isLightMode: lightMode
        });
    }

    // refresh control
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 800);
    }, []);

    return (
        <View className="flex px-4" style={lightMode ? styles.background : darkStyles.background} >

            {/* search bar and logo */}
            <SafeAreaView >
                <StatusBar style={lightMode ? "dark" : "light"} />

                <View className="flex-row justify-between items-center px-8 pt-2 pb-6">
                    {/* Logo */}
                    <Text className="text-xl font-semibold leading-5"
                        style={lightMode ? styles.text : darkStyles.text}
                    >
                        <Text style={lightMode ? styles.title : darkStyles.title}>Pick{'\n'}</Text>
                        <Text style={lightMode ? styles.text : darkStyles.text}>A{'\n'}</Text>
                        <Text style={lightMode ? styles.text : darkStyles.text}>Film</Text>
                    </Text>

                    {/* Menu */}
                    <TouchableOpacity onPress={ goToSearch }>
                        <Bars3Icon
                            size="45"
                            strokeWidth={2}
                            color={lightMode ? styles.text.color : darkStyles.text.color}
                        />
                    </TouchableOpacity>

                    {/* lightmode button */}
                    {/* {lightMode ? (
                        <TouchableOpacity onPress={() => setLightMode(!lightMode)}>
                            <MoonIcon
                                size="30"
                                strokeWidth={4}
                                color={styles.text.color}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => setLightMode(!lightMode)}>
                            <SunIcon
                                size="30"
                                strokeWidth={4}
                                color={darkStyles.text.color}
                            />
                        </TouchableOpacity>
                    )
                    } */}
                </View>
            </SafeAreaView>

            {/* Film List */}
            {
                // loading page
                loading ? (
                    <Loading lightMode={lightMode} />
                ) : (
                    // film lists
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 8 }}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        {/* Trending Films Carousel */}
                        <MyEvents data={trending} lightMode={lightMode} />

                        {/* Top Rated Films Carousel */}
                        <EventList title="What's Nearby" data={topRated} lightMode={lightMode} />

                        {/* Trending Films Carousel */}
                        <EventList title="Discover" data={upcoming} lightMode={lightMode} />

                        {/* Spacing */}
                        <View className="mb-48"></View>

                    </ScrollView>
                )
            }
        </View>
    )
}