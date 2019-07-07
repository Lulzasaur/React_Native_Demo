import React from 'react';
import { FlatList, View, Text} from 'react-native';
import { BleManager } from 'react-native-ble-plx';


class BluetoothForm extends React.Component {
    constructor() {
        super();
        this.manager = new BleManager();
    }
    
    render() {

      return (
        <View>    
           <Text>test</Text>
        </View>
      );
    }

    
}
  
export default BluetoothForm