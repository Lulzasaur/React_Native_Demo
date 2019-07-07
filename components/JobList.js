import React from 'react';
import { FlatList, View} from 'react-native';
import {ListItem} from 'react-native-elements';

class JobList extends React.Component {
    
    renderItem = ({ item }) => (
        <ListItem
        title={item.title}
        subtitle={item.subtitle}
        leftAvatar={{source:{uri:item.logo}}}
        onPress={async ()=>{
          await this.props.findMatchingSkills(item.title)
          await this.props.toggleOverlay(true)
          }
        }
        >
        </ListItem>
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