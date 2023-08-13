import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme';
import TrendingFilms from '../components/trendingFilms';
import Watchlist from '../components/watchlist';
import TopRatedFilms from '../components/topRatedFilms';
import { useState } from 'react';

const ios = Platform.OS === 'ios';
const baseMargin = ios? 'mb-2': 'mb-3';


export default function HomeScreen() {
    
    const [watchlist, setWatch] = useState([1,2,3]); 
    const [trending, setTrending] = useState([1,2,3]); 
    const [topRated, settopRated] = useState([1,2,3]); 
    const navigation = useNavigation();  

    return (
        <View className="flex-1 bg-neutral-800" >
            {/* search bar and logo */}
            <SafeAreaView className={baseMargin}>
                <StatusBar style="light" />

                <View className="flex-row justify-between items-center mx-4">

                    {/* Menu */}
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
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 10}}
            >
                {/* Watchlist Films Carousel */}
                <Watchlist data={watchlist} />

                {/* Trending Films Carousel */}
                <TrendingFilms title="Trending" data={trending} />

                {/* Top Rated Films Carousel */}
                <TopRatedFilms title="Top Rated" data={topRated} />

            </ScrollView>
        </View>
    )
}