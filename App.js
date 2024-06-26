
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import MovieScreen from './src/screens/MovieScreen';
import MovieScreen2 from './src/screens/MovieScreen2';
import SearchScreen from './src/screens/SearchScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
AppRegistry.registerComponent('AwesomeProject', () => App);
const Stack = createStackNavigator()

export default () => {
  const [fontLoaded] = useFonts({
    Regular : require("./assets/fonts/NunitoSans_7pt_Expanded-Regular.ttf"),
    Bold : require("./assets/fonts/NunitoSans_7pt-Bold.ttf"),
    Black : require("./assets/fonts/NunitoSans_7pt-Black.ttf"),
    ExtaBold : require("./assets/fonts/NunitoSans_7pt-ExtraBold.ttf"),
    ExtraLight : require("./assets/fonts/NunitoSans_7pt_Expanded-ExtraLight.ttf"),
    Light : require("./assets/fonts/NunitoSans_7pt-Light.ttf"),
    SemiBold : require("./assets/fonts/NunitoSans_7pt-SemiBold.ttf"),
  });


  
  return fontLoaded ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home"  component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="movie" component={MovieScreen} options={{headerShown:false}}/>
        <Stack.Screen name="movieNew" component={MovieScreen2} options={{headerShown:false}}/>
        <Stack.Screen name="searchScreen" component={SearchScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  ):(<AppLoading/>);
}

