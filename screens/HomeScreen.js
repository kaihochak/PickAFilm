import { View, Text, TouchableOpacity, ScrollView, ScrollViewBase } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';
import Watchlist from '../components/watchlist';
import FilmList from '../components/filmList';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetchWatchlist, fetchTopRated, fetchTrending, fetchUpcoming } from '../api/tmdb' 
import Loading from '../components/loading';
import { Use } from 'react-native-svg';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import EventCardList from '../components/eventCardList';
// import events from '../constants/index';

const ios = Platform.OS === 'ios';
const baseMargin = ios? 'mb-2': 'mb-3';

export default function HomeScreen() {
    
    // const [events, setEvents] = useState([1,2,3]);
    const [watchlist, setWatchlist] = useState([]); 
    const [trending, setTrending] = useState([]); 
    const [topRated, setTopRated] = useState([]); 
    const [upcoming, setUpcoming] = useState([]); 
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();  

    // call api, fetch data
    useEffect(()=>{
        // getEventCardList();
        getWatchlist();
        getTrending();
        getTopRated();
        getUpcoming();
    }  ,[]);

    // fetch data for event list
    // const getEventCardList = async ()=>{
    //     const data = [{1,2,3}];
    //     setEvents(data);
    //     setLoading(false);
    // }

    // fetch data for watchlist films
    const getWatchlist = async ()=>{
        const data = await fetchWatchlist();
        console.log('got watchlist', data.results.length);
        if(data && data.results) setWatchlist(data.results);
        setLoading(false);
    }

    // fetch data for trending films
    const getTrending = async ()=>{
        const data = await fetchTrending();
        console.log('got trending', data.results.length);
        if(data && data.results) setTrending(data.results);
        setLoading(false);
    }

    // fetch data for top rated films
    const getTopRated = async ()=>{
        const data = await fetchTopRated();
        console.log('got top rated', data.results.length); 
        if(data && data.results) setTopRated(data.results);
        setLoading(false);
    }

    // fetch data for upcoming films
    const getUpcoming = async ()=>{
        const data = await fetchUpcoming();
        console.log('got upcoming', data.results.length);
        if(data && data.results) setUpcoming(data.results);
        setLoading(false);
    }

    return (
        <View className="flex-1 bg-neutral-800" >
            {/* search bar and logo */}
            <SafeAreaView className={baseMargin}>
                <StatusBar style="light" />

                <View className="flex-row justify-between items-center mx-4">

                    {/* Menu */}
                    {/* to do: make the menu bar able to popout and have selections of function */}
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    
                    {/* Logo */}
                    <Text 
                        className="text-white text-3xl font-bold">
                        <Text style={styles.text}>Pick</Text>AFilm
                    </Text>

                    {/* Search */}
                    <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>

                </View>
            </SafeAreaView>

            {/* Film List */}
            {
                // loading page
                loading? (
                    <Loading />
                ) : (
                  
                    // Film Picker
                    // film lists
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 10}}
                    >

                        {/* Event List Carousel */}
                        {/* TO DO - very important in stage 2 */}
                        <EventCardList title="My Events" />

                        {/* Watchlist Films Carousel */}
                        <Watchlist data={watchlist} />

                        {/* Top Rated Films Carousel */}
                        <FilmList title="Top Rated" data={topRated} />

                        {/* Trending Films Carousel */}
                        <FilmList title="Trending" data={trending} />

                        {/* Upcoming Films Carousel */}
                        <FilmList title="Upcoming" data={upcoming} />
                 
                    </ScrollView>
                )
            }
        </View>
    )
}