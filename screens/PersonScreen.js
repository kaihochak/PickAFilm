import { View, Text, Image, TouchableOpacity, Platform, Dimensions, ScrollView, RefreshControl, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonFilms, image500 } from '../api/tmdb';
import Loading from '../components/loading';
import { darkStyles, styles } from '../theme';
import FilmList from '../components/filmList';
import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';

const ios = Platform.OS == 'ios';
// const verticalMargin = ios ? '' : ' my-3';
var { width, height } = Dimensions.get('window');

export default function PersonScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const item = route.params.item;
    const lightMode = route.params.isLightMode;

    const [person, setPerson] = useState({});
    const [personFilms, setPersonFilms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        console.log("item:",item);
        console.log(lightMode);
        setLoading(true);
        getPersonDetails(item.id);
        getPersonFilms(item.id);
    }, [item]);

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id);
        setLoading(false);
        if (data) {
            setPerson(data);
        }
    }

    const getPersonFilms = async id => {
        const data = await fetchPersonFilms(id);
        if (data && data.cast) {
            setPersonFilms(data.cast);
        }
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

            {/* back button and title */}
            <SafeAreaView >
                <View className="flex-row justify-between items-center mx-4 mb-3">

                    {/* back button */}
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon
                            size="30"
                            strokeWidth={3}
                            style={lightMode ? styles.text : darkStyles.text}
                        />
                    </TouchableOpacity>

                    {/* Logo */}
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
                        <Text className="text-3xl font-bold" >
                            <Text style={lightMode ? styles.title : darkStyles.title}>Pick</Text>
                            <Text style={lightMode ? styles.text : darkStyles.text}>AFilm</Text>
                        </Text>
                    </TouchableWithoutFeedback>

                    {/* Spacing */}
                    <View className="w-10"></View>

                </View>
            </SafeAreaView>

            {/* person details */}
            {
                loading ? (
                    <Loading lightMode={lightMode}/>
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 8 }}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        <View
                            className="flex-row justify-center items-center pt-10 pb-4"
                            style={{
                                shadowColor: "gray",
                                shadowRadius: 20,
                                shadowOffset: { width: 1, height: 2},
                                shadowOpacity: 0.1,
                            }}
                        >
                            <Image
                                className="overflow-hidden rounded-xl border-neutral-500 border-[0.5px]"
                                source={person?.profile_path ? { uri: image500(person?.profile_path) } : fallbackPersonImage}
                                style={{ height: height * 0.4, width: width * 0.65 }}
                            />
                        </View>

                        {/* Name & Place*/}
                        <View className="mt-6">
                            <Text className="text-3xl font-bold text-center">
                                {lightMode ? (
                                    <Text style={styles.title}>{person?.name}</Text>
                                ) : (
                                    <Text style={darkStyles.title}>{person?.name}</Text>
                                )
                                }
                            </Text>
                            <Text className="text-base text-center">
                                {lightMode ? (
                                    <Text style={styles.text}>{person?.place_of_birth}</Text>
                                ) : (
                                    <Text style={darkStyles.text}>{person?.place_of_birth}</Text>
                                )
                                }

                            </Text>
                        </View>

                        {/* Birthday & Popularity */}
                        <View className="flex-row flex-wrap px-5 mt-2 py-6">
                            {/* Left Box */}
                            <View className="w-1/2 px-10 items-center">
                                <Text className="font-semibold pb-1" style={lightMode ? style.text : darkStyles.text}>
                                    Birthday
                                </Text>
                                <Text className="text-sm" style={lightMode ? style.paragraph : darkStyles.paragraph}>
                                    {person?.birthday}
                                </Text>
                            </View>
                            {/* Right Box */}
                            <View className="w-1/2 px-10 items-center">
                                <Text className="font-semibold pb-1" style={lightMode ? style.text : darkStyles.text}>
                                    Popularity
                                </Text>
                                <Text className="text-sm" style={lightMode ? style.paragraph : darkStyles.paragraph}>
                                    {person?.popularity?.toFixed(2)} %
                                </Text>
                            </View>
                        </View>

                        {/* Biography */}
                        <View className="mx-4">
                            <Text className="font-bold text-xl mb-4" style={lightMode ? styles.text : darkStyles.text}>
                                Biography
                            </Text>
                            <Text className="mx-2 tracking-wide leading-6 font-normal mb-8">
                                {lightMode ? (
                                    <Text style={styles.paragraph}>
                                        {person?.biography ? person.biography : 'N/A'}
                                    </Text>
                                ) : (
                                    <Text style={darkStyles.paragraph}>
                                        {person?.biography ? person.biography : 'N/A'}
                                    </Text>
                                )
                                }
                            </Text>
                        </View>

                        {/* person movies */}
                        <FilmList title={'Filmography'} hideSeeAll={true} data={personFilms} lightMode={lightMode}/>

                        {/* Spacing */}
                        <View className="mb-28"></View>
                    </ScrollView>

                )
            }
        </View>
    )
}