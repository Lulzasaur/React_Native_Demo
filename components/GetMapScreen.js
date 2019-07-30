import React from 'react';
import MapView from 'react-native-maps';
import MapOpen from './MapOpen';

const APIbaseURL = `https://services3.arcgis.com/bWPjFyq029ChCGur/arcgis/rest/services/ARFVTP_Funded_Public_Electric_Vehicle_Charging_Stations/FeatureServer/0/query?where=1%3D1&outFields=Site_Location,Address,City,ZIP,Latitude,Longitude,Category,Level_2_Charger,DC_Fast_Charger,Is_the_project_completed&outSR=4326&f=json`

class GetMapScreen extends React.Component {
    constructor(props){
        super(props)

        this.state = {
          markers:[{
            coordinate:{
              latitude: 33.045052,
              longitude: -117.292178,
            },
            description: "561 S Vulcan Ave",
            key: "33.045052-117.292178",
            title: "City of Encinitas Town Hall Overflow Lot"
          }]
        }
    }

    async getAPIandSetState(route,stateItem){
        let responseXML = await fetch(route),
            responseText = await responseXML.json(),
            responseArr = [],
            index=0
  
        responseText.features.map(item=>{
            let place = {},
                coordinate = {}

            coordinate = {
                latitude:item.attributes.Latitude,
                longitude:item.attributes.Longitude
            }

            place.coordinate=coordinate
            place.title=item.attributes.Site_Location
            place.description=item.attributes.Address
            place.key=`${index}${coordinate.latitude}${coordinate.longitude}`

            index++
            
            if(coordinate.latitude && coordinate.longitude){
                responseArr.push(place)
            }

        })

        await this.setState({[stateItem]:[...responseArr]})
    }

    async componentDidMount(){
        this.getAPIandSetState(APIbaseURL,'markers')
    }

    render() {
        return (
            <MapView 
            style={{flex: 1}}
            initialRegion={{
            latitude: 37.4419,
            longitude: -122.1430,
            latitudeDelta: 1,
            longitudeDelta: 1,
            }}
            >
            {this.state.markers.map(marker => (
                <MapView.Marker
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
                key={marker.key}
                >
                <MapView.Callout>
                    <MapOpen 
                        longitude={marker.coordinate.longitude} 
                        latitude={marker.coordinate.latitude} 
                        label={marker.title}
                        />
                </MapView.Callout>
                </MapView.Marker>
            ))}
            </MapView>
        );
    }  
}

export default GetMapScreen