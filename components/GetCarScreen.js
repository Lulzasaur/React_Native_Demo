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

    async componentDidMount(){

      let yearListXML = await fetch(`${APIbaseURL}/vehicle/menu/year`),
          yearListText = await yearListXML.text(),
          yearArr = []

          await parseString(yearListText,function(err,result){
            result.menuItems.menuItem.map(year=>yearArr.push({key:year.value[0],label:year.value[0]}))
          })
          
          this.setState({years:[...yearArr]})
    }

    async componentDidUpdate(prevProps,prevState,snapshot){
      //handle for Make
      if(prevState.pickedYear !== this.state.pickedYear){

        let makeListXML = await fetch(`${APIbaseURL}/vehicle/menu/make?year=${this.state.pickedYear}`)
            makeListText = await makeListXML.text(),
            makeArr = []
        
            await parseString(makeListText,function(err,result){
              result.menuItems.menuItem.map(make=>makeArr.push({key:make.value[0],label:make.text[0]}))
            })    
        
            this.setState({make:[...makeArr]})
        }

      //handle for Model
      if(prevState.pickedMake !== this.state.pickedMake){

        let modelListXML = await fetch(`${APIbaseURL}/vehicle/menu/model?year=${this.state.pickedYear}&make=${this.state.pickedMake}`)
            modelListText = await modelListXML.text(),
            modelArr = []
        
            await parseString(modelListText,function(err,result){
              result.menuItems.menuItem.map(model=>modelArr.push({key:model.value[0],label:model.text[0]}))
            })    
        
            this.setState({model:[...modelArr]})
        }

        //pick Car
        if(prevState.pickedModel !== this.state.pickedModel){

          let pickedCarXML = await fetch(`${APIbaseURL}/vehicle/menu/options?year=${this.state.pickedYear}&make=${this.state.pickedMake}&model=${this.state.pickedModel}`)
              pickedCarText = await pickedCarXML.text(),
              pickedCarID = ''
          
              await parseString(pickedCarText,function(err,result){
                pickedCarId = result.menuItems.menuItem[0].value[0]
              })    

              this.setState({pickedCarId})
        }

        //get individual car info
        if(prevState.pickedCarId !== this.state.pickedCarId){
        
          let carInfoXML = await fetch(`${APIbaseURL}/vehicle/${this.state.pickedCarId}`)
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