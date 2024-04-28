import { StyleSheet, Text, View ,Image } from 'react-native'
import React from 'react'
import { getPoster } from '../services/MovieService'
import Colors from '../constants/Colors'


const CastCard = ({originalName, image, characterName}) => {
      return (
            <View style={styles.container}>
                  <Image source={{uri:getPoster(image)}} resizeMode='cover' style={styles.image}/>
                  <Text style={styles.originalName} numberOfLines={2}>{originalName}</Text>
                  <Text style={styles.characterName} numberOfLines={2}>{characterName}</Text>
            </View>
      )
}


const styles = StyleSheet.create({
      container : {
            flex:1,

      },
      image:{
            height:120,
            width:80,
            borderRadius:10
      },
      originalName : {
            width:80,
            color:Colors.BLACK,
            fontWeight:"bold",
            fontSize:12
      },
      characterName:{
            width:80,
            color:Colors.LIGHT_GRAY,
            fontWeight:"bold",
            fontSize:10,

      }
})


export default CastCard