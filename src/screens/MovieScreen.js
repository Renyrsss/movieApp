import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View  ,ScrollView, Dimensions ,Image , TouchableOpacity, Linking , FlatList} from 'react-native';
import Colors from '../constants/Colors';
import { getMovieById , getPoster , getVideo , getLanguage} from '../services/MovieService';
import ItemSeparator from '../components/ItemSeparator';
import {LinearGradient} from "expo-linear-gradient"
import {Feather, Ionicons} from "@expo/vector-icons"
import { APPEND_TO_RESPONSE as AR} from '../constants/Urls';
import CastCard from '../components/CastCard';

const {height, width} = Dimensions.get('screen');

const setHeight = (h) => (height/100) * h;
const setWidth = (w) => (width/100) * w;

function MovieScreen({route , navigation}) {
      const {movieId} = route.params;

      const [movie, setMovie] = useState({})

      useEffect(()=>{
            getMovieById(movieId, `${AR.VIDEO},${AR.CREDITS}`).then((response)=>setMovie(response?.data))
      },[])
      return (
            <ScrollView >
                  <StatusBar style='light'/>
                  <LinearGradient colors={["rgba(0,0,0,0.5)", "rgba(217,217,217,0)"]} start={[0, 0.3]} style={styles.linearGradient}/>
                  <View style={styles.moviePosterImageContainer}>
                        <Image style={styles.moviePosterImage}  resizeMode='cover' source={{uri: getPoster(movie?.backdrop_path)}}/>
                  </View>
                  <View style={styles.headerContainer}>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.goBack()}>
                              <Feather name='chevron-left' size={37} color={Colors.WHITE}/>
                        </TouchableOpacity>
                        <Text style={styles.headerText}>
                              Shere
                        </Text>
                  </View>
                  <TouchableOpacity style={styles.playButton} onPress={()=> Linking.openURL(getVideo(movie.videos.results[0].key))}>
                        <Ionicons name='play-circle-outline' size={70} color={Colors.WHITE}/>
                  </TouchableOpacity>
                  <ItemSeparator height={setHeight(37)} />
                  <View style={styles.movieTitleContainer}>
                        <Text style={styles.movieTitle}>{movie?.original_title}</Text>
                        <View style={styles.row}>
                              <Ionicons name='heart' size={22} color={Colors.HEART}/>
                              <Text style={styles.ratingText}>{movie?.vote_average}</Text>
                        </View>
                  </View>
                  <Text style={styles.genreText}>
                        {movie?.genres?.map(genre => genre?.name)?.join(",")} | {movie?.runtime} min
                  </Text>
                  <Text  style={styles.genreText}>{getLanguage(movie?.original_language)?.english_name }</Text>

                  <View style={styles.overviewContainer}>
                        <Text style={styles.overviewTitle}>
                              Overview
                        </Text>
                        <Text style={styles.overviewText}>
                              {movie?.overview}
                        </Text>
                  </View>

                  <View>
                        <Text style={styles.castTitle}>Cast</Text>
                        <View>
                              
                        </View>
                        <FlatList 
                              style={{marginVertical:5}}
                              data ={movie?.credits?.cast}
                              keyExtractor={(item) => item?.credit_id}
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              ListHeaderComponent={()=> <ItemSeparator width={20}/>}
                              ItemSeparatorComponent={()=><ItemSeparator width={20}/>}
                              ListFooterComponent={()=> <ItemSeparator width={20}/>}
                              renderItem={({item}) =>  <CastCard 
                                                            originalName={item?.name}
                                                            characterName={item?.character}
                                                            image={item?.profile_path}
                                                            />}

                        />
                        
                  </View>
            </ScrollView>
      )
}





const styles = StyleSheet.create({
      container: {
            flex:1,
            backgroundColor : Colors.BASICBACKGROUND
      },
      moviePosterImageContainer : {
            height: setHeight(35),
            width : setWidth(145),
            alignItems: "center",
            position:"absolute",
            left:setWidth((100-145) / 2),
            top: 0,
            borderBottomRightRadius:300,
            borderBottomLeftRadius:300,
            elevation:8,
      },
      moviePosterImage : {
            borderBottomRightRadius:300,
            borderBottomLeftRadius:300,
            width: setWidth(145),
            height: setHeight(35)
      },
      linearGradient : {
            width : setWidth(100),
            setHeight: setHeight(6),
            position: "absolute",
            top:0,
            elevation:9
      },
      headerContainer : {
            flexDirection: "row",
            alignItems : "center",
            justifyContent: "space-between",
            paddingHorizontal:20,
            position: "absolute",
            right:0,
            left:0,
            top:50,
            elevation:20,
      },
      headerText: {
            color :Colors.WHITE,
            fontWeight:"bold",
            fontSize:18,
            
      },
      playButton : {
            position: "absolute",
            top: 110,
            left: setWidth(50) - 70/2,
            elevation: 10,
      },
      movieTitleContainer : {
            flexDirection : "row",
            alignItems:"center",
            justifyContent:"space-between",
            paddingHorizontal:20,
      },
      movieTitle : {
            color:Colors.BLACK,
            fontWeight:"bold",
            fontSize:18,
            width : setWidth(60),
      },    
      ratingText: {
            marginLeft:5,
            color:Colors.BLACK,
            fontWeight:"bold",
            fontSize:15,
      },
      row : {
            flexDirection:"row",
            alignItems:"center"
      } , 
      genreText : {
            color:Colors.LIGHT_GRAY,
            paddingHorizontal:20,
            paddingTop:5,
            fontWeight:"bold",
            fontSize:13,
      },
      overviewContainer:{
            backgroundColor:Colors.EXTRA_LIGHT_GRAY,
            paddingHorizontal:20,
            paddingVertical:10,
            marginVertical:10,
      },
      overviewText:{
            color:Colors.LIGHT_GRAY,
            paddingVertical:5,
            fontWeight:"bold",
            fontSize:13,
            textAlign:"justify"
      },
      overviewTitle:{
            color:Colors.BLACK,
            fontWeight:"bold",
            fontSize:18,
      },
      castTitle : {
            marginLeft : 20,
            color:Colors.BLACK,
            fontWeight:"bold",
            fontSize:18
      }
});


export default MovieScreen