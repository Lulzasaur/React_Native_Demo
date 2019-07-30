import React, { Component } from 'react';
import { Button, Platform, Linking } from 'react-native';
 
class MapOpen extends Component {
  constructor(props){
    super(props)
  }
  
  openGps = () => {
    
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${this.props.latitude},${this.props.longitude}`;
    const label = `${this.props.label}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    
    Linking.openURL(url);
  }

  render() {
    return (
      <Button
        color={'#bdc3c7'}
        onPress={this.openGps}
        title={this.props.label}
        key={this.props.key} />
    );
  }
}

export default MapOpen