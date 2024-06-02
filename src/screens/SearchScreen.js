import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View  ,ScrollView, Dimensions ,Image , TouchableOpacity, Linking , FlatList, TextInput} from 'react-native';
import Colors from '../constants/Colors';
import { getMovieById ,getRec,getSim, getPoster , getVideo , getLanguage} from '../services/MovieService';
import ItemSeparator from '../components/ItemSeparator';
import {LinearGradient} from "expo-linear-gradient"
import {Feather, Ionicons} from "@expo/vector-icons"
import { APPEND_TO_RESPONSE as AR} from '../constants/Urls';
import MovieCard from '../components/MovieCard';
import CastCard from '../components/CastCard';
import { useNavigation } from '@react-navigation/native';

import { searchMovie } from '../services/MovieService';

const {height, width} = Dimensions.get('screen');

const setHeight = (h) => (height/100) * h;
const setWidth = (w) => (width/100) * w;

function MovieScreen({route , navigation}) {

      const [isCastSelected , setIsCastSelected] = useState(true)
      const [movie, setMovie] = useState({data:{backdrop_path: '',original_title:'',vote_average:'' , genres:'' , runtime:'' , original_language:'' , overview:""}})
      const navigator = useNavigation()
      const [rec , setRec] = useState();
      const [sim , setSim] = useState();
      const [input , setInput] = useState('');
      const [movies , setMovies] = useState({})
      useEffect(()=>{
            
            setMovies({results:searchMovie(input)})
      },[input])

      console.log(movies);
      return (
            <ScrollView  style={{backgroundColor:'gray'}}>
                  <StatusBar style='light'/>
                  <LinearGradient colors={["rgba(0,0,0,0.5)", "rgba(217,217,217,0)"]} start={[0, 0.3]} style={styles.linearGradient}/>

                  <View style={styles.headerContainer}>
                        <TouchableOpacity activeOpacity={1} onPress={()=>navigation.goBack()}>
                              <Feather name='chevron-left' size={37} color={Colors.BLACK}/>
                        </TouchableOpacity>
                        <Text style={styles.headerText}>
                              Shere
                        </Text>
                  </View>

                  <Text style={styles.extraListTitle}>
                        Search movie
                  </Text>
                  <TextInput style={styles.textinput} value={input} onChangeText={text => setInput(text)}/>
                  <Text style={styles.extraListTitle}>
                        {input}
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
                                                                        return navigation.navigate("movie", {movieId:item.id})
                                                                  }}
                                                                  /> }

                        />

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
            marginTop:30,
            marginLeft:20,
            color : Colors.BLACK,
            fontWeight:"bold",
            fontSize:18,
            marginVertical:8,
      },
      movieListContianer : {

      },
      textinput : {
            padding : 15,
            border:'2px solid black',
            borderRadius:9,
            fontSize:18,
            backgroundColor:'black',
            marginTop:50,
            marginLeft:15,
            marginRight:15,
            color:'white'
      }
});


export default MovieScreen