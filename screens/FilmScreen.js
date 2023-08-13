import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, EyeIcon} from 'react-native-heroicons/outline';
import { EyeIcon as EyeIconSolid } from 'react-native-heroicons/solid';

import { styles } from '../theme';

var {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '': 'mt-3';

export default function FilmScreen() {

    const {params: item} =  useRoute();
    const navigation = useNavigation();
    
    useEffect(() => {
        // call API
    }, [item])
  
// style={styles.background}

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

                    {/* add button */}
                    <TouchableOpacity >
                        <EyeIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </SafeAreaView>                          
            </View>
            
            <Text>Film Screen</Text>
        </ScrollView >
    )
}