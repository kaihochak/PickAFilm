
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
                </View>
            </SafeAreaView>


//


<ScrollView
showsVerticalScrollIndicator={false}
contentContainerStyle={{ paddingBottom: 8 }}
>
<View >
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

    {/* genres  */}
    <View className="flex-row justify-center mx-4 space-x-2">
        {filmDetails?.genres?.map((genre, index) => {
            let lastOne = index + 1 == filmDetails.genres.length;
            return (
                <Text key={index} className="font-normal text-base text-center">
                    {lightMode ? (
                        <Text style={styles.paragraph}>
                            {genre?.name}{lastOne ? null : " |"}
                        </Text>
                    ) : (
                        <Text style={darkStyles.paragraph}>
                            {genre?.name}{lastOne ? null : " |"}
                        </Text>
                    )}
                </Text>
            );
        })}
    </View>

    {/* description */}
    <Text className="mx-8 tracking-wide leading-6 font-light">
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
</View>

{/* Cast */}
<View >
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