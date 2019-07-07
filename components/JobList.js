import React from 'react';
import JobForm from './JobForm';
import { FlatList, View, Text } from 'react-native';
import {List, ListItem} from 'react-native-elements';

class JobList extends React.Component {
    
    renderItem = ({ item }) => (
      <ListItem
        title={item.title}
        subtitle={item.subtitle}
        leftAvatar={{
          source: item.logo && { uri: item.logo },
        }}
      />
    )
    render() {

      return (
        <View>
              
            <FlatList
                data={this.props.jobList}
                renderItem={this.renderItem}
            />       
        </View>
      );
    }

    
}
  
export default JobList