import { View, Text , StyleSheet , TouchableOpacity , TouchableNativeFeedback,ImageBackground} from 'react-native'
import React, { useState } from 'react'
import Colors from '../constants/Colors'
import {Ionicons} from '@expo/vector-icons'
import { getPoster ,getLanguage} from '../services/MovieService'



const MovieCard = ({title ,poster,language,voteAverage,voteCount, size = 1 , heartLess = true , onPress}) => {
      const [liked , setLiked] = useState(false)
      const [voteCountValue, setVoteCountValue] = useState(voteCount)



      return (
            <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
                  <ImageBackground 
                        style={{...styles.container , width:230 * size , height:340*size}} 
                        imageStyle={{borderRadius:12}} 
                        source={{uri:getPoster(poster)}}>
                              {!heartLess ? (
                                    <TouchableNativeFeedback onPress={()=>{
                                          setLiked(!liked)
                                          setVoteCountValue(liked ? voteCountValue - 1 : voteCountValue + 1)
                                    }}>
                                          <Ionicons name={liked ? "heart": "heart-outline"} 
                                                size={25 * size} 
                                                color={liked ? Colors.HEART : Colors.WHITE} 
                                                style={{position:"absolute", bottom:10, left:10,}}/>
                                    </TouchableNativeFeedback>
                              ) : null}
                  </ImageBackground>
                  <View>
                        <Text style={{...styles.movieTitle , width:230 * size}} numberOfLines={3}>{title}</Text>
                        <View style={styles.movieSubTitleContainer} >
                              <Text style={styles.MovieSubtitle}>{getLanguage(language).english_name}</Text>
                              <View style={styles.rowAndCenter}>
                                    <Ionicons name="heart" size={17 * size} color={Colors.HEART}style={{marginRight:5 }}/>
                                    <Text style={styles.MovieSubtitle}>{voteCountValue}</Text>
                              </View>
                        </View>
                  </View>
            </TouchableOpacity>
      )
}


const styles = StyleSheet.create({
      container : {
            // backgroundColor : Colors.ACTIVE,
            height:340,
            width:230,
            borderRadius:12,
            elevation:5,
            marginVertical:2,
      },

      movieTitle : {
            fontWeight:"bold",
            color:Colors.GRAY,
            paddingVertical:2,
            marginTop:5,
            width:230,
      },
      movieSubTitleContainer : {
            flexDirection : "row",
            alignItems : "center",
            justifyContent:"space-between"
      },
      MovieSubtitle : {
            fontSize:12,

      },
      rowAndCenter : {
            flexDirection : "row",
            alignItems : "center"
      }
})



// MovieCard.defaultProps={
//       size : 1,
// }

MovieCard.defaultProps = {
      size:1,
}




export default MovieCard