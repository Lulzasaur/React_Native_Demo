import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PickerModule from './PickerModule';
import {parseString} from 'react-native-xml2js'

const APIbaseURL = 'https://www.fueleconomy.gov/ws/rest'

class GetCarScreen extends React.Component {
    constructor(props){
        super(props)

        this.state = {
          years:[],
          make:[],
          model:[],
          pickedYear:'',
          pickedMake:'',
          pickedModel:'',
          pickedCarId:'',
          evMotor:''
      }

      this.onChange = this.onChange.bind(this);
    }

    async onChange(value,type) {
      await this.setState({ [type]: value });
    }

    async getAPIandSetState(route,stateItem){
      let responseXML = await fetch(route),
          responseText = await responseXML.text(),
          responseArr = []

      await parseString(responseText,function(err,result){
        result.menuItems.menuItem.map(item=>responseArr.push({key:item.value[0],label:item.text[0]}))
      })
      
      this.setState({[stateItem]:[...responseArr]})
    }

    async componentDidMount(){
      this.getAPIandSetState(`${APIbaseURL}/vehicle/menu/year`,'years')
    }

    async componentDidUpdate(prevProps,prevState,snapshot){
      if(prevState.pickedYear !== this.state.pickedYear){
        this.getAPIandSetState(`${APIbaseURL}/vehicle/menu/make?year=${this.state.pickedYear}`,'make')
      }

      if(prevState.pickedMake !== this.state.pickedMake){
        this.getAPIandSetState(`${APIbaseURL}/vehicle/menu/model?year=${this.state.pickedYear}&make=${this.state.pickedMake}`,'model') 
      }

      if(prevState.pickedModel !== this.state.pickedModel){
        this.getAPIandSetState(`${APIbaseURL}/vehicle/menu/options?year=${this.state.pickedYear}&make=${this.state.pickedMake}&model=${this.state.pickedModel}`,'pickedCarId') 
      }

      if(prevState.pickedCarId !== this.state.pickedCarId){

        let carInfoXML = await fetch(`${APIbaseURL}/vehicle/${this.state.pickedCarId[0].key}`)
            carInfoText = await carInfoXML.text(),
            evMotor = ''
        
            await parseString(carInfoText,function(err,result){
              evMotor = result.vehicle.evMotor
            })    

            this.setState({evMotor})
      }
    }

    render() {

      return (
        <View style={{
          flex:1,
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'stretch'
          }}>
            <PickerModule initValue='Select Year' data={this.state.years} onChange={this.onChange} modalType={'pickedYear'}/>
            <PickerModule initValue='Select Make' data={this.state.make} onChange={this.onChange} modalType={'pickedMake'}/>
            <PickerModule initValue='Select Model' data={this.state.model} onChange={this.onChange} modalType={'pickedModel'}/>
            <TouchableOpacity style={{
                alignItems: 'center',
                backgroundColor: '#DDDDDD',
                padding: 10
              }}>
              <Text>{this.state.evMotor}</Text>
            </TouchableOpacity>
        </View>
      );
    }

    
}
  
export default GetCarScreen