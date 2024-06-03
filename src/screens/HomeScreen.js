import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,ScrollView ,FlatList} from 'react-native';
import Colors from '../constants/Colors';
import GenreCard from '../components/GenreCard';
import ItemSeparator from '../components/ItemSeparator';
import MovieCard from '../components/MovieCard';
import { getNowPlayingMovies , getUpComingMovies, getAllGenres} from '../services/MovieService';



const Genres = ["All", "Action" , "Camedy" , "Romance" , "Horror" , "Sci-fi"];
function HomeScreen({route , navigation}) {


      const [activeGenre , setActiveGenre] = useState("All")
      const [nowPlayingMovies , setNowPlayingMovies] = useState({})
      const [upComingMovies , setupComingMovies ] = useState({})
      const [genres , setGenres ] = useState([{id:10110, name:"All"}])
      useEffect(()=>{
            getNowPlayingMovies().then((movieResponse => setNowPlayingMovies(movieResponse.data)));
            getUpComingMovies().then((movieResponse => setupComingMovies(movieResponse.data)))
            getAllGenres().then((genreResponse)=>setGenres([...genres,...genreResponse.data.genres]))
      },[])

 

      return (
            <ScrollView style={styles.container}>
                  <StatusBar style="light" 
                        translucent={false}  
                        backgroundColor={Colors.BASICBACKGROUND}/>

                  <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Now playing</Text>
                        <Text style={styles.headerSubTitle} onPress={()=>navigation.navigate("searchScreen")}>Search Movie</Text>
                  </View>

                  <View style={styles.genreListContainer}>
                        <FlatList 
                              data={genres} 
                              showsHorizontalScrollIndicator={false}
                              horizontal 
                              keyExtractor={(item) => item.id.toString()} 
                              ItemSeparatorComponent={()=><ItemSeparator width={20} />}
                              ListHeaderComponent={()=><ItemSeparator width={20}/> }
                              ListFooterComponent={()=><ItemSeparator width={20}/>}
                              renderItem={({item,index}) => <GenreCard 
                                                                  genreName={item.name} 
                                                                  onPress={(genreName) => setActiveGenre(genreName)}
                                                                  active={item.name === activeGenre ? true : false}/>}/>
                        {/* <FlatLIst data={Genres} horizontal keyExtractor={(item)=>item} renderItem={ ( { item, index } )  => {return <View></View>} }  /> */}
                  </View>


                  <View>
                        <FlatList 
                              data={nowPlayingMovies.results} 
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
                  <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Coming soon</Text>
                        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
                  </View>
                  <View>
                        <FlatList 
                              data={upComingMovies.results} 
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
                                                                  size={0.7}
                                                                  onPress={()=>navigation.navigate("movie", {movieId:item.id})}
                                                                  /> }

                                                                  />
                  </View>
                  
            </ScrollView>
)
}





const styles = StyleSheet.create({
      container: {
            flex:1,
            backgroundColor: Colors.BASICBACKGROUND,
      },

      headerContainer : {
            flexDirection: "row",
            justifyContent:"space-between",
            alignItems:"center",
            paddingHorizontal : 20,
            paddingVertical : 10,
      },
      headerTitle : {
            fontSize:28,
            
      },
      headerSubTitle : {
            fontSize:13,
            color:Colors.ACTIVE
            
      },

      genreListContainer : {
            paddingVertical : 10,
      }




});


export default HomeScreen