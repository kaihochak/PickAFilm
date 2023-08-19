import { View, Text, TouchableOpacity, ScrollView, Appearance } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MoonIcon, SunIcon } from 'react-native-heroicons/solid';
import { styles,darkStyles } from '../theme';
import Watchlist from '../components/watchlist';
import FilmList from '../components/filmList';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetchWatchlist, fetchTopRated, fetchTrending, fetchUpcoming } from '../api/tmdb'
import Loading from '../components/loading';


const ios = Platform.OS === 'ios';
const baseMargin = ios ? 'mb-2' : 'mb-3';

export default function HomeScreen() {
    const [lightMode, toggleLightMode] = useState(false);
    const [watchlist, setWatchlist] = useState([]); // [
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    // call api, fetch data
    useEffect(() => {
        getWatchlist();
        getTrending();
        getTopRated();
        getUpcoming();
    }, []);

    // fetch data for watchlist films
    const getWatchlist = async () => {
        const data = await fetchWatchlist();
        if (data && data.results) setWatchlist(data.results);
        setLoading(false);
    }

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

    return (
        <View className="flex" style={lightMode?styles.background:darkStyles.background} >

            {/* search bar and logo */}
            <SafeAreaView className={baseMargin}>
                <StatusBar style={lightMode?"dark":"light"} />

                <View className="flex-row justify-between items-center mx-4 mb-3">

                    {/* Search */}
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon 
                            size="30" 
                            strokeWidth={2}
                            color={lightMode?styles.text.color:darkStyles.text.color} 
                        />
                    </TouchableOpacity>

                    {/* Logo */}
                    <Text
                        className="text-white text-3xl font-bold">
                        <Text 
                            style={lightMode?styles.title:darkStyles.title}
                        >Pick</Text>
                        <Text 
                            style={lightMode?styles.text:darkStyles.text}
                        >AFilm</Text>
                    </Text>

                    {/* lightmode button */}
                    {lightMode ? (
                        <TouchableOpacity onPress={() => toggleLightMode(!lightMode)}>
                            <MoonIcon
                                size="30"
                                strokeWidth={4}
                                color={styles.text.color}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => toggleLightMode(!lightMode)}>
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
                    <Loading />
                ) : (

                    // film lists
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 8 }}
                    >
                        {/* Watchlist Films Carousel */}
                        <Watchlist data={watchlist} lightMode={lightMode}/>

                        {/* Top Rated Films Carousel */}
                        <FilmList title="Top Rated" data={topRated} lightMode={lightMode} />

                        {/* Trending Films Carousel */}
                        <FilmList title="Trending" data={trending} lightMode={lightMode} />

                        {/* Upcoming Films Carousel */}
                        <FilmList title="Upcoming" data={upcoming} lightMode={lightMode} />

                        {/* Spacing */}
                        <View className="mb-28"></View>

                    </ScrollView>
                )
            }
        </View>
    )
}