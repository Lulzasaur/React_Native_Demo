import React from 'react';
import { View, Text } from 'react-native';

class HomeScreen extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>SUPER COOL HOME SCREEN</Text>
        </View>
      );
    }
  }

export default HomeScreen