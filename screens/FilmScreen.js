import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, EyeIcon} from 'react-native-heroicons/outline';
import { EyeIcon as EyeIconSolid } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '': 'mt-3';

export default function FilmScreen() {

    const {params: item} =  useRoute();
    const [inWatchlist, toggleWatchlist] = useState(false);
    const navigation = useNavigation();
    let filmName = 'the best movie ever';

    useEffect(() => {
        // call API
    }, [item])

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            className="flex-1 bg-neutral-900"
        >
            {/* back button and poster */}
            <View className="full">
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
                <View>
                    <Image
                        source={require('../assets/images/poster1.jpg')}
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
            </View>
            
            {/* Film Information */}
            <View style={{marginTop: -(height*0.09)}} className="space-y-3">
                
                {/* title */}
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {/* {item.title} */}
                    {filmName}
                </Text>

                {/* Information */}
                <Text className="text-neutral-400 font-semibold text-base text-center">
                    {/* {item.release_date} */}
                    2021 | 170 min
                </Text>

                {/* Genres */}
                <Text className="text-neutral-400 font-semibold text-base text-center">
                    Action | Adventure | Fantasy
                </Text>

                {/* Description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {/* {item.overview} */}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                </Text>
            </View>
        </ScrollView>
    )
}