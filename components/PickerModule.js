import React from 'react';
import { View, TextInput, Switch, TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector'

class PickerModule extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={{justifyContent:'center', padding:10}}>
                <ModalSelector
                    data={this.props.data}
                    initValue={this.props.initValue}
                    onChange={(option)=>{ this.props.onChange(option.label,this.props.modalType) }}
                    overlayStyle={{ flex: 1, padding: '15%', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }} />
            </View>
        );
    }
}

export default PickerModule