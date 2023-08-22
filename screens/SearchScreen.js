import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Dimensions, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation, useRoute } from '@react-navigation/native'
import { fallbackMoviePoster, image185, searchFilms } from '../api/tmdb'
import { debounce } from 'lodash'
import Loading from '../components/loading'
import { darkStyles, styles } from '../theme'

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {

    const navigation = useNavigation();
    const route = useRoute();
    const lightMode = route.params.isLightMode;
    const handleClick = (item) => {
        navigation.push('Film', {
            item: item,
            isLightMode: lightMode
        });
    }

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([])
    const [refreshing, setRefreshing] = useState(false);


    const handleSearch = search => {
        console.log('searching for', search);
        if (search && search.length > 0) {
            setLoading(true);
            searchFilms({
                query: search,
                include_adult: false,
                language: 'en-US',
                page: 1
            }).then(data => {
                setLoading(false);
                if (data && data.results) setResults(data.results);
            })
        } else {
            setLoading(false);
            setResults([])
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    // refresh control
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 800);
    }, []);

    return (

        <SafeAreaView className="flex-1" style={lightMode ? styles.background : darkStyles.background}>

            {/* search input */}
            <View
                className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full" >

                {/* search bar */}
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder="Search Films"
                    placeholderTextColor={'lightgray'}
                    className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                />

                {/* cancel button*/}
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className="rounded-full p-3 m-1 bg-neutral-500"
                >
                    <XMarkIcon size="25" color="white" />
                </TouchableOpacity>
            </View>

            {/* search results */}
            {
                // loading page
                loading ? (
                    <Loading />
                ) :
                    // results page
                    results.length > 0 ? (

                        // show the results
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            className="space-y-3"
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        >
                            <View className="flex-row justify-between flex-wrap">
                                {
                                    results.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={() => handleClick(item)}>
                                                <View className="space-y-2 mb-4">
                                                    <Image
                                                        source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                                                        className="rounded-3xl"
                                                        style={{ width: width * 0.44, height: height * 0.3 }}
                                                    />
                                                    <Text className="text-gray-300 ml-1">
                                                        {
                                                            item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title
                                                        }
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        // no results
                        <View className="flex-row justify-center">
                            {/* <Text className="text-white font-semibold ml-1">Results ({results.length})</Text> */}
                        </View>
                    )
            }
        </SafeAreaView>
    )
}