import { View, Text, Image, TouchableOpacity, Platform, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonFilms, image185, image342, image500 } from '../api/tmdb';
import Loading from '../components/loading';
import { darkStyles, styles } from '../theme';
import FilmList from '../components/filmList';
import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';

const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : ' my-3';
var { width, height } = Dimensions.get('window');

export default function PersonScreen() {
    const { params: item, lightMode } = useRoute();
    const navigation = useNavigation();

    const [person, setPerson] = useState({});
    const [personFilms, setPersonFilms] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPersonDetails(item?.person?.id);
        getPersonFilms(item?.person?.id);
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
                    <Text className="text-3xl font-bold">
                        <Text style={lightMode ? styles.title : darkStyles.title}>Pick</Text>
                        <Text style={lightMode ? styles.text : darkStyles.text}>AFilm</Text>
                    </Text>

                    {/* Spacing */}
                    <View className="w-10"></View>

                </View>
            </SafeAreaView>

            {/* person details */}
            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 8 }}
                    >
                        <View
                            className="flex-row justify-center items-center pt-7 pb-2"
                            style={{
                                shadowColor: 'gray',
                                shadowRadius: 10,
                                shadowOffset: { width: 5, height: 5 },
                                shadowOpacity: 5,
                            }}
                        >
                            <View
                                className="overflow-hidden h-72 w-72 border-neutral-500 border-2">
                                <Image
                                    source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                                    style={{ height: height * 0.43, width: width * 0.74 }}
                                />
                            </View>
                        </View>

                        {/* Name & Place*/}
                        <View className="mt-6">
                            <Text className="text-3xl text-white font-bold text-center">
                                {lightMode ? (
                                    <Text style={styles.title}>{person?.name}</Text>
                                ) : (
                                    <Text style={darkStyles.title}>{person?.name}</Text>
                                )
                                }
                            </Text>
                            <Text className="text-neutral-500 text-base text-center">
                                {lightMode ? (
                                    <Text style={styles.text}>{person?.place_of_birth}</Text>
                                ) : (
                                    <Text style={darkStyles.text}>{person?.place_of_birth}</Text>
                                )
                                }

                            </Text>
                        </View>

                        {/* Birthday & Popularity */}
                        <View className="mx-3 p-4 mt-2 flex-row justify-between items-center">
                            
                            {/* Left Box */}
                            <View className="px-10 items-center">
                                <Text className="font-semibold" style={lightMode?style.text:darkStyles.text}>
                                    Birthday
                                </Text>
                                <Text className="text-sm" style={lightMode?style.paragraph:darkStyles.paragraph}>
                                    {person?.birthday}
                                </Text>
                            </View>

                            {/* Right Box */}
                            <View className="px-10 items-center">
                                <Text className="font-semibold" style={lightMode?style.text:darkStyles.text}>
                                    Popularity
                                </Text>
                                <Text className="text-sm" style={lightMode?style.paragraph:darkStyles.paragraph}>
                                    {person?.popularity?.toFixed(2)} %
                                </Text>
                            </View>

                        </View>
                        
                        {/* Biography */}
                        <View className="my-6 mx-4 space-y-2">
                            <Text className="text-white text-lg">Biography</Text>
                            <Text className="text-neutral-400 tracking-wide">
                                {
                                    person?.biography ? person.biography : 'N/A'
                                }
                            </Text>
                        </View>

                        {/* person movies */}
                        <FilmList title={'Films'} hideSeeAll={true} data={personFilms} />

                    </ScrollView>

                )
            }
        </View>
    )
}