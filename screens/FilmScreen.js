import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image,
    TouchableWithoutFeedback,
    RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { ArrowLeftIcon, PlusIcon } from "react-native-heroicons/outline";
import { styles, darkStyles } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import FilmList from "../components/filmList";
import Loading from "../components/loading";
import {
    fetchFilmDetails,
    fetchCast,
    image500,
    fetchSimilarMovies,
    fallbackMoviePoster,
} from "../api/tmdb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";

export default function FilmScreen() {

    const navigation = useNavigation();
    const route = useRoute();

    const item = route.params.item;
    const lightMode = route.params.isLightMode;
    const [cast, setCast] = useState([]);
    const [similarFilms, setSimilarFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filmDetails, setFilmDetails] = useState({});
    const [refreshing, setRefreshing] = useState(false);


    // call API
    useEffect(() => {
        getFilmDetails(item.id);
        getCast(item.id);
        getSimilarFilms(item.id);
    }, [item]);

    // fetch data for film details
    const getFilmDetails = async (id) => {
        const data = await fetchFilmDetails(id);
        if (data) setFilmDetails(data);
        setLoading(false);
    };

    // fetch data for cast
    const getCast = async (id) => {
        const data = await fetchCast(id);
        if (data && data.cast) setCast(data.cast);
    };

    // fetch data for similar films
    const getSimilarFilms = async (id) => {
        const data = await fetchSimilarMovies(id);
        if (data && data.results) setSimilarFilms(data.results);
    };

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

                    {/* Add Button */}
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <PlusIcon
                            size="30"
                            strokeWidth={3}
                            style={lightMode ? styles.text : darkStyles.text}
                        />
                    </TouchableOpacity>

                </View>
            </SafeAreaView>

            {/* loading page */}
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
                        <View>
                            <Image
                                source={ item?.poster_path ? {uri: image500(item.poster_path)} : fallbackMoviePoster }
                                style={{ width: width, height: height * 0.55 }}
                            />
                            <LinearGradient
                                colors={["transparent", lightMode ? styles.background.backgroundColor : darkStyles.background.backgroundColor]}
                                style={{ width, height: height * 0.4 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                className="absolute bottom-0"
                            />
                        </View>

                        {/* Film Information */}
                        <View style={{ marginTop: -(height * 0.1) }} className="space-y-3">
                            {/* title */}
                            <Text className="text-center text-3xl font-bold tracking-widest">
                                {lightMode ? (
                                    <Text style={styles.text}>{filmDetails?.title}</Text>
                                ) : (
                                    <Text style={darkStyles.text}>{filmDetails?.title}</Text>
                                )
                                }
                            </Text>

                            {/* release year, runtime */}
                            {filmDetails?.id ? (
                                <Text className="font-normal text-base text-center">
                                    {lightMode ? (
                                        <Text style={styles.paragraph}>
                                            {filmDetails?.release_date?.split("-")[0] || "N/A"}{" | "}{filmDetails?.runtime} min
                                        </Text>
                                    ) : (
                                        <Text style={darkStyles.paragraph}>
                                            {filmDetails?.release_date?.split("-")[0] || "N/A"}{" | "}{filmDetails?.runtime} min
                                        </Text>
                                    )
                                    }
                                </Text>
                            ) : null}

                            {/* description */}
                            <Text className="mx-8 tracking-wide leading-6 font-normal">
                                {lightMode ? (
                                    <Text style={styles.paragraph}>
                                        {filmDetails?.overview}
                                    </Text>
                                ) : (
                                    <Text style={darkStyles.paragraph}>
                                        {filmDetails?.overview}
                                    </Text>
                                )
                                }
                            </Text>


                            {/* genres  */}
                            <View className="flex-row flex-wrap justify-center mx-4 space-x-2">
                                {filmDetails?.genres?.map((genre, index) => {
                                    let lastOne = index + 1 == filmDetails.genres.length;
                                    return (
                                        <Text className="font-light text-sm text-center">
                                            {lightMode ? (
                                                <Text key={index} style={styles.paragraph} >
                                                    {genre?.name}{lastOne ? null : " /"}
                                                </Text>
                                            ) : (
                                                <Text key={index} style={darkStyles.paragraph}>
                                                    {genre?.name}{lastOne ? null : " /"}
                                                </Text>
                                            )}
                                        </Text>
                                    );
                                })}
                            </View>


                        </View>

                        {/* Cast */}
                        <View >
                            {
                                cast.length > 0 &&
                                <Cast navigation={navigation} cast={cast} lightMode={lightMode} />
                            }
                        </View>

                        {/* Similar Films */}
                        <View className="mt-2">
                            {
                                similarFilms.length > 0 &&
                                <FilmList title="Similar Films" hideSeeAll={true} data={similarFilms} lightMode={lightMode} />
                            }
                        </View>

                        {/* Spacing */}
                        <View className="mb-28"></View>

                    </ScrollView>
                )
            }
        </View>
    )
}
