import React from 'react';
import HomeScreen from './components/HomeScreen'
import GetCarScreen from './components/GetCarScreen'
import {View} from 'react-native';  
import { createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';  

const RouteConfigs = {
    Home: {
      screen: HomeScreen,
      navigationOptions:{
        tabBarLabel:'Home',
          tabBarIcon:({tintColor})=>(
            <View>
              <Icon style ={[{color:tintColor}]} size={25} name={'ios-home'} />
            </View>
          )
      }
    },
    Cars: {
      screen:GetCarScreen,
      navigationOptions:{
        tabBarLabel:'Car Details',
          tabBarIcon:({tintColor})=>(
            <View>
              <Icon style ={[{color:tintColor}]} size={25} name={'ios-car'} />
            </View>
          )
      }
    }
}

const BottomNavigatorConfig = {
  initialRouteName: 'Home',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
}

const RootStack = createMaterialBottomTabNavigator(
  RouteConfigs, 
  BottomNavigatorConfig
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
