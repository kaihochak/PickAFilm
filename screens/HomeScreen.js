import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MoonIcon, SunIcon } from 'react-native-heroicons/solid';
import { styles, darkStyles } from '../theme';
import Watchlist from '../components/watchlist';
import FilmList from '../components/filmList';
import { useState } from 'react';
import { fetchWatchlist, fetchTopRated, fetchTrending, fetchUpcoming } from '../api/tmdb'
import Loading from '../components/loading';
import { useNavigation } from '@react-navigation/native';

const ios = Platform.OS === 'ios';
const baseMargin = ios ? 'mb-2' : 'mb-3';

export default function HomeScreen() {

    const navigation = useNavigation();
    const [lightMode, setLightMode] = useState(false);
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
        <View className="flex" style={lightMode ? styles.background : darkStyles.background} >

            {/* search bar and logo */}
            <SafeAreaView >
                <StatusBar style={lightMode ? "dark" : "light"} />

                <View className="flex-row justify-between items-center mx-4 mb-3">

                    {/* Search */}
                    <TouchableOpacity onPress={goToSearch}>
                        <MagnifyingGlassIcon
                            size="30"
                            strokeWidth={2}
                            color={lightMode ? styles.text.color : darkStyles.text.color}
                        />
                    </TouchableOpacity>

                    {/* Logo */}
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
                        <Text className="text-3xl font-bold" >
                            <Text style={lightMode ? styles.title : darkStyles.title}>Pick</Text>
                            <Text style={lightMode ? styles.text : darkStyles.text}>AFilm</Text>
                        </Text>
                    </TouchableWithoutFeedback>

                    {/* lightmode button */}
                    {lightMode ? (
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
                    }

                </View>
            </SafeAreaView>

            {/* Film List */}
            {
                // loading page
                loading ? (
                    <Loading lightMode={lightMode}/>
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
                        <Watchlist data={trending} lightMode={lightMode} />

                        {/* Top Rated Films Carousel */}
                        <FilmList title="Top Rated" data={topRated} lightMode={lightMode} />

                        {/* Trending Films Carousel */}
                        <FilmList title="Upcoming" data={upcoming} lightMode={lightMode} />

                        {/* Spacing */}
                        <View className="mb-28"></View>

                    </ScrollView>
                )
            }
        </View>
    )
}