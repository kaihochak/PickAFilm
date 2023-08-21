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
} from "../api/tmdb";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";

function FilmTab() {
    return (
        <Text>test</Text>
    )
}

function CastTab() {
    return (
        <Text>test</Text>
    )
}


function SimilarFilmsTab() {
    return (
        <Text>test</Text>
    )
}

const Tab = createBottomTabNavigator();

export default function FilmScreen() {

    const navigation = useNavigation();
    const route = useRoute();
    const item = route.params.item;
    const lightMode = route.params.isLightMode;
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
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Film" component={FilmTab} />
                <Tab.Screen name="Cast" component={CastTab} />
                <Tab.Screen name="Similar" component={SimilarFilmsTab} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
