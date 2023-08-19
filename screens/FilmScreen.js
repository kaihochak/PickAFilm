import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { MoonIcon, SunIcon } from "react-native-heroicons/solid";
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
} from "../api/tmdb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";

export default function FilmScreen() {
    const { params: item } = useRoute();
    const [lightMode, toggleLightMode] = useState(false);
    const navigation = useNavigation();
    const [cast, setCast] = useState([]);
    const [similarFilms, setSimilarFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filmDetails, setFilmDetails] = useState({});

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

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            style={!lightMode ? darkStyles.background : styles.background}
            className="flex-1"
        >
            {/* back button and poster */}
            <View className="w-full">
                <SafeAreaView
                    className={
                        "absolute z-20 w-full flex-row justify-between items-center px-4" +
                        topMargin
                    }
                >
                    {/* back button */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="rounded-xl p-1"
                    >
                        <ArrowLeftIcon 
                            size="30" 
                            strokeWidth={2} 
                            style={lightMode?styles.text:darkStyles.text} />
                    </TouchableOpacity>

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
                </SafeAreaView>

                {/* poster */}
                {loading ? (
                    <Loading />
                ) : (
                    <View>
                        <Image
                            source={{
                                uri: image500(item.poster_path) || fallbackMoviePoster,
                            }}
                            style={{ width: width, height: height * 0.55 }}
                        />
                        {lightMode ? (
                            <LinearGradient
                                colors={["transparent", styles.background.backgroundColor]}
                                style={{ width, height: height * 0.4 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                className="absolute bottom-0"
                            />
                        ) : (
                            <LinearGradient
                                colors={["transparent", darkStyles.background.backgroundColor]}
                                style={{ width, height: height * 0.4 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                className="absolute bottom-0"
                            />
                        )
                        }
                    </View>
                )}
            </View>

            {/* Film Information */}
            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                {/* title */}
                <Text className="text-white text-center text-3xl font-bold tracking-widest">
                    {filmDetails?.title}
                </Text>

                {/* status, release year, runtime */}
                {filmDetails?.id ? (
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        {filmDetails?.status} •{" "}
                        {filmDetails?.release_date?.split("-")[0] || "N/A"} •{" "}
                        {filmDetails?.runtime} min
                    </Text>
                ) : null}

                {/* genres  */}
                <View className="flex-row justify-center mx-4 space-x-2">
                    {filmDetails?.genres?.map((genre, index) => {
                        let showDot = index + 1 != filmDetails.genres.length;
                        return (
                            <Text
                                key={index}
                                className="text-neutral-400 font-semibold text-base text-center"
                            >
                                {genre?.name} {showDot ? "•" : null}
                            </Text>
                        );
                    })}
                </View>

                {/* description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {filmDetails?.overview}
                </Text>
            </View>

            {/* Cast */}
            <View>
                {
                    cast.length > 0 &&
                    <Cast navigation={navigation} cast={cast} />
                }
            </View>

            {/* Similar Films */}
            <View className="mt-4">
                {
                    similarFilms.length > 0 &&
                    <FilmList title="Similar Films" hideSeeAll={true} data={similarFilms} />
                }
            </View>
        </ScrollView>
    );
}
