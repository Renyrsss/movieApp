import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View  ,ScrollView, Dimensions ,Image , TouchableOpacity, Linking , FlatList} from 'react-native';
import Colors from '../constants/Colors';
import { getMovieById ,getRec,getSim, getPoster , getVideo , getLanguage,getcredits} from '../services/MovieService';
import ItemSeparator from '../components/ItemSeparator';
import {LinearGradient} from "expo-linear-gradient"
import {Feather, Ionicons} from "@expo/vector-icons"
import { APPEND_TO_RESPONSE as AR} from '../constants/Urls';
import MovieCard from '../components/MovieCard';
import CastCard from '../components/CastCard';
import { useNavigation } from '@react-navigation/native';



const {height, width} = Dimensions.get('screen');

const setHeight = (h) => (height/100) * h;
const setWidth = (w) => (width/100) * w;

function MovieScreen({route , navigation}) {
      const {movieId} = route.params;
      const [isCastSelected , setIsCastSelected] = useState(true)
      const [movie, setMovie] = useState({data:{backdrop_path: '',original_title:'',vote_average:'' , genres:'' , runtime:'' , original_language:'' , overview:"" ,genres:[]}})
      const navigator = useNavigation()
      const [rec , setRec] = useState();
      const [sim , setSim] = useState()
      const [cred , setCred] = useState()
      useEffect(()=>{
            getMovieById(movieId, 
                        `${AR.VIDEO},
                        ${AR.CREDITS},
                        ${AR.RECOMMENDATIONS},
                        ${AR.SIMILAR}`)
                        .then((response)=>setMovie(response));


            getRec(movieId).then((res)=>{
                  
                  // console.log(res.data.results[1]);
                  setRec(res.data.results)})

            getSim(movieId).then((res)=>{
                  
                  // console.log(res.data.results[1]);
                  setSim(res.data.results)})

            
            getcredits(movieId).then((res) => {
                  setCred(res.data.cast)
            })
      },[])

      return (
            <ScrollView >
                  <StatusBar style='light'/>
                  <LinearGradient colors={["rgba(0,0,0,0.5)", "rgba(217,217,217,0)"]} start={[0, 0.3]} style={styles.linearGradient}/>
                  <View style={styles.moviePosterImageContainer}>
                        <Image style={styles.moviePosterImage}  resizeMode='cover' source={{uri: getPoster(movie?.data.backdrop_path)}}/>
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
                        <Text style={styles.movieTitle}>{movie?.data.original_title}</Text>
                        <View style={styles.row}>
                              <Ionicons name='heart' size={22} color={Colors.HEART}/>
                              <Text style={styles.ratingText}>{movie?.data.vote_average}</Text>
                        </View>
                  </View>
                  <Text style={styles.genreText}>
                        {movie?.data.genres?.map(genre => genre?.name)?.join(",")} | {movie?.data.runtime} min
                  </Text>
                  <Text  style={styles.genreText}>{getLanguage(movie?.data.original_language)?.english_name }</Text>

                  <View style={styles.overviewContainer}>
                        <Text style={styles.overviewTitle}>
                              Overview
                        </Text>
                        <Text style={styles.overviewText}>
                              {movie?.data.overview}
                        </Text>
                  </View>

                  <View>
                        <Text style={styles.castTitle}>Cast</Text>
                        <View style={styles.castSubMenuContainer}>
                              <TouchableOpacity activeOpacity={0.5} onPress={()=> setIsCastSelected(true)}>
                                    <Text style={{...styles.castSubMenuText, color: isCastSelected ? Colors.BLACK : Colors.LIGHT_GRAY}}>
                                          Cast
                                    </Text>
                              </TouchableOpacity>

                              <TouchableOpacity activeOpacity={0.5} onPress={()=> setIsCastSelected(false)} >
                                    <Text  style={{...styles.castSubMenuText, color: isCastSelected ? Colors.LIGHT_GRAY : Colors.BLACK}}>
                                          Crew
                                    </Text>
                              </TouchableOpacity>
                        </View>
                        <FlatList 
                              style={{marginVertical:5}}
                              data ={isCastSelected ? cred : movie?.credits?.crew}
                              keyExtractor={(item) => item?.credit_id}
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              ListHeaderComponent={()=> <ItemSeparator width={20}/>}
                              ItemSeparatorComponent={()=><ItemSeparator width={20}/>}
                              ListFooterComponent={()=> <ItemSeparator width={20}/>}
                              renderItem={({item}) =>  <CastCard 
                                                            originalName={item?.name}
                                                            characterName={isCastSelected ? item?.character : item?.job}
                                                            image={item?.profile_path}
                                                            />}

                        />
                        
                  </View>
                  <Text style={styles.extraListTitle}>
                        Recommended Movies
                  </Text>
                  
                        <FlatList 
                              data ={rec}
                              keyExtractor={(item) => item?.id?.toString()}
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              ListHeaderComponent={()=> <ItemSeparator width={20}/>}
                              ItemSeparatorComponent={()=><ItemSeparator width={20}/>}
                              ListFooterComponent={()=> <ItemSeparator width={20}/>}
                              renderItem={({item}) =>  <MovieCard 
                                                                  title= {item.title} 
                                                                  keyExtractor={(item) => item?.id?.toString()}
                                                                  language={item.original_language} 
                                                                  voteAverage ={item.vote_average}
                                                                  voteCount ={item.vote_count}
                                                                  poster={item.poster_path}
                                                                  size={0.8}
                                                                  onPress={()=>{
                                                                        console.log(item.id)
                                                                        return navigator.navigate("movieNew", {movieId:item.id})
                                                                  }}
                                                                  /> }

                        />
                  <Text style={styles.extraListTitle}>
                        Similar Movies
                  </Text>
                  
                        <FlatList 
                              data ={sim}
                              keyExtractor={(item) => item?.id?.toString()}
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              ListHeaderComponent={()=> <ItemSeparator width={20}/>}
                              ItemSeparatorComponent={()=><ItemSeparator width={20}/>}
                              ListFooterComponent={()=> <ItemSeparator width={20}/>}
                              renderItem={({item}) =>  <MovieCard 
                                                                  title= {item.title} 
                                                                  language={item.original_language} 
                                                                  voteAverage ={item.vote_average}
                                                                  voteCount ={item.vote_count}
                                                                  poster={item.poster_path}
                                                                  size={0.7}
                                                                  onPress={()=>navigator.navigate("movieNew", {movieId:item.id})}
                                                                  /> }
                              

                        />
                  <View>
                        <FlatList 
                              data ={movie?.similar?.results}
                              showsHorizontalScrollIndicator={false}
                              horizontal 
                              keyExtractor={(item) => item.id.toString()} 
                              ItemSeparatorComponent={()=><ItemSeparator width={20} />}
                              ListHeaderComponent={()=><ItemSeparator width={20}/> }
                              ListFooterComponent={()=><ItemSeparator width={20}/>}
                              renderItem={({item,index}) => <MovieCard 
                                                                  title= {item.title} 
                                                                  language={item.original_language} 
                                                                  voteAverage ={item.vote_average}
                                                                  voteCount ={item.vote_count}
                                                                  poster={item.poster_path}
                                                                  heartLess={false}
                                                                  onPress={()=>navigation.navigate("movie", {movieId:item.id})}
                                                                  /> }/>
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
      }, 
      castSubMenuContainer : {
            marginLeft: 20,
            flexDirection : "row",
            marginVertical:5,
      }, 
      castSubMenuText :{
            marginRight:10,
            color:Colors.BLACK,
            fontSize:13,
            fontWeight:"bold"
      },
      extraListTitle : {
            marginLeft:20,
            color : Colors.BLACK,
            fontWeight:"bold",
            fontSize:18,
            marginVertical:8,
      },
      movieListContianer : {

      }
});


export default MovieScreen