import React from 'react';
import BluetoothForm from './BluetoothForm';
import { Button, View, Text } from 'react-native';

class GetBluetoothScreen extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <BluetoothForm></BluetoothForm>
        </View>
      );
    }

    
}
  
export default GetBluetoothScreen