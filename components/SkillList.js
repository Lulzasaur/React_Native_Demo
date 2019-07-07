import React from 'react';

import { FlatList, View, Text, Modal, TouchableHighlight, Alert } from 'react-native';
import {Overlay, ListItem} from 'react-native-elements';

const APIbaseURL =  `http://api.dataatwork.org/v1`

class SkillList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          isVisible:false,
          skillList:[],
          update:true
        }
    }

    async componentDidUpdate(prevProps,prevState,snapshot){
      
        if(this.state.update){
        // normalize job title first
            let normalizedTitleResponse = await fetch(`${APIbaseURL}/jobs/normalize?job_title=${this.props.title}`),
                normalizedTitleResponseJSON = await normalizedTitleResponse.json(), 
                jobId = normalizedTitleResponseJSON[0].uuid//normalized job uuid

        //get skills associated with normalized job title
            let skillsResponse = await fetch(`${APIbaseURL}/jobs/${jobId}/related_skills`),
                skillsResponseJSON = await skillsResponse.json()

            await this.setState({...this.state,skillList:skillsResponseJSON,update:false})
            console.log(this.state)
        }
    }

    render() {
        
        return (
            <View>
                <Overlay
                    isVisible={this.state.isVisible}
                    onBackdropPress={() => this.setState({ isVisible: false })}
                >
               {this.state.skillList.length>1?this.state.skillList.map((skill) => {
                   <Text>{skill.skill_name}</Text>
               }):<Text>No skills associated with this job</Text>}
                </Overlay>

                <ListItem
                title={this.props.title}
                subtitle={this.props.subtitle}
                leftAvatar={{source:{uri:this.props.logo}}}
                onPress={() => {
                    this.setState({ isVisible: true });
                }}>
                </ListItem>
            </View>
        );
    } 
}
  
export default SkillList