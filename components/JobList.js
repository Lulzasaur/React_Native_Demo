import React from 'react';
import { FlatList, View} from 'react-native';
import SkillList from './SkillList'

class JobList extends React.Component {
    
    renderItem = ({ item }) => (
        <SkillList title={item.title} subtitle={item.subtitle} logo={item.logo} />
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