import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, EyeIcon} from 'react-native-heroicons/outline';
import { EyeIcon as EyeIconSolid } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import filmList from '../components/filmList.js';
import Loading from '../components/loading';
import { fetchFilmDetails, image500 } from '../api/tmdb';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '': 'mt-3';

export default function FilmScreen() {

    const {params: item} =  useRoute();
    const [inWatchlist, toggleWatchlist] = useState(false);
    const navigation = useNavigation();
    const [cast, setCast] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
    const [similarFilms, setSimilarFilms] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
    const [loading, setLoading] = useState(false);
    const [filmDetails, setFilmDetails] = useState({});

    useEffect(() => {
        // call API
        // console.log('itemId: ', item.id);
        setLoading(true);
        getFilmDetails(item.id);
    }, [item])

    // fetch data for film details
    const getFilmDetails = async id => {
        const data = await fetchFilmDetails(id);
        if (data) setFilmDetails(data);
        setLoading(false);
    }

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            className="flex-1 bg-neutral-900"
        >
            {/* back button and poster */}
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4" + topMargin}>

                    {/* back button */}
                    <TouchableOpacity onPress={()=> navigation.goBack()} className="rounded-xl p-1">
                        <ArrowLeftIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>

                    {/* watchlist button */}
                    <TouchableOpacity onPress={()=> toggleWatchlist(!inWatchlist)}>
                        <EyeIcon size="30" strokeWidth={2} color={inWatchlist? theme.background : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>        

                {/* poster */}
                {
                    loading? (
                        <Loading />
                    ) : (
                        <View>
                            <Image
                                source={{uri: image500(item.poster_path) || fallbackMoviePoster}}
                                style={{width: width, height: height*0.55}}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                style={{width, height: height*0.4}}
                                start={{x: 0.5, y: 0}}
                                end={{x: 0.5, y: 1}}
                                className='absolute bottom-0'
                            />
                        </View>
                    )
                }

            </View>
            
            {/* Film Information */}
            <View style={{marginTop: -(height*0.09)}} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-widest">
            {
                filmDetails?.title
            }
        </Text>

        {/* status, release year, runtime */}
        {
            filmDetails?.id? (
                <Text className="text-neutral-400 font-semibold text-base text-center">
                    {filmDetails?.status} • {filmDetails?.release_date?.split('-')[0] || 'N/A'} • {filmDetails?.runtime} min
                </Text>
            ):null
        }
        

        
        {/* genres  */}
        <View className="flex-row justify-center mx-4 space-x-2">
            {
                filmDetails?.genres?.map((genre,index)=>{
                    let showDot = index+1 != filmDetails.genres.length;
                    return (
                        <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                            {genre?.name} {showDot? "•":null}
                        </Text>
                    )
                })
            }
        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
            {
                filmDetails?.overview
            }
        </Text>
        
     </View>

            {/* Cast */}
            <Cast navigation={navigation} cast={cast}/>

            {/* Similar Films */}
            {/* <View className="mt-4">
                <filmList.js title="Similar Films" hideSeeAll={true} data={similarFilms}/>
            </View> */}

        </ScrollView>
    )
}