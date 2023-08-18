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
import { ArrowLeftIcon, EyeIcon } from "react-native-heroicons/outline";
import { EyeIcon as EyeIconSolid } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
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
const topMargin = ios ? "" : "mt-3";

export default function EventScreen() {
    const { params: event } = useRoute();
    const [inWatchlist, toggleWatchlist] = useState(false);
    const navigation = useNavigation();
    const [cast, setCast] = useState([]);
    const [similarFilms, setSimilarFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filmDetails, setFilmDetails] = useState({});

    useEffect(() => {
        // call API
        // getFilmDetails(item.id);
        // getCast(item.id);
        // getSimilarFilms(item.id);
        setLoading(false);
    }, [event]);

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
        console.log("got similar films", data.results);
        if (data && data.results) setSimilarFilms(data.results);
    };


    console.log('event', event?.name);

    return (
        
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900"
        >

            {/* buttons and poster */}
            <View className="w-full">

                {/* Buttons */}
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
                        <ArrowLeftIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>

                    {/* watchlist button */}
                    {/* <TouchableOpacity onPress={() => toggleWatchlist(!inWatchlist)}>
                        <EyeIcon
                            size="30"
                            strokeWidth={2}
                            color={inWatchlist ? theme.background : "white"}
                        />
                    </TouchableOpacity> */}
                    
                </SafeAreaView>

                {/* poster */}
                {
                    loading ? ( <Loading /> ) : (
                    <View>
                        <Image
                            source={event?.image}
                            style={{ width: width, height: height * 0.55 }}
                        />
                        <LinearGradient
                            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
                            style={{ width, height: height * 0.4 }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className="absolute bottom-0"
                        />
                    </View>
                    )
                }
            </View>


            {/* Event Information */}
            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">

                {/* Event Title */}
                <Text className="text-white text-center text-3xl font-bold tracking-widest">
                    Event Title
                </Text>

                {/* Date */}
                <Text className="text-white text-center text-3xl font-bold tracking-widest">
                    date
                </Text>


                {/* description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {filmDetails?.overview}
                </Text>
            </View>

            {/* Cast */}
            {/* <View>
                {
                    cast.length > 0 &&             
                    <Cast navigation={navigation} cast={cast} />
                }
            </View> */}

            {/* Similar Event */}
            {/* <View className="mt-4">
                {
                    similarFilms.length > 0 &&
                    <FilmList title="Similar Films" hideSeeAll={true} data={similarFilms} />
                }
            </View> */}
        </ScrollView>
    );
}