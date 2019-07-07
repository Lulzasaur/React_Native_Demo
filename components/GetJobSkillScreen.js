import React from 'react';
import JobForm from './JobForm';
import JobList from './JobList';
import { View, Text } from 'react-native';
import {Overlay} from 'react-native-elements';

const APIbaseURL =  `http://api.dataatwork.org/v1`
const GITbaseURL = `https://jobs.github.com/positions.json`

class GetJobSkillScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          jobSearchTerm:'',
          jobListings:[],
          isOverlayVisible:false,
          selectedJobSkills:[]
        }
        this.handleSkillSearch = this.handleSkillSearch.bind(this)
        this.toggleOverlay = this.toggleOverlay.bind(this)
        this.findMatchingSkills = this.findMatchingSkills.bind(this)
    }

    handleSkillSearch(title){
      this.setState({jobSearchTerm:title})      
    }

    toggleOverlay(visible){
      this.setState({isOverlayVisible:visible})
    }

    async findMatchingSkills(title){
      // normalize job title first
      let normalizedTitleResponse = await fetch(`${APIbaseURL}/jobs/normalize?job_title=${title}`),
          normalizedTitleResponseJSON = await normalizedTitleResponse.json(), 
          jobId = normalizedTitleResponseJSON[0].uuid//normalized job uuid

      
      //get skills associated with normalized job title
      let skillsResponse = await fetch(`${APIbaseURL}/jobs/${jobId}/related_skills`),
          skillsResponseJSON = await skillsResponse.json()

      let skills =[]
      
      for(let skill of skillsResponseJSON.skills){
        skills.push(<Text>{skill.skill_name}</Text>)
      }
      
      await this.setState({selectedJobSkills:skills})
    }

    async componentDidUpdate(prevProps,prevState,snapshot){
      
      if(prevState.jobSearchTerm !== this.state.jobSearchTerm){
      
      //get jobs associated with normalized job title
        let jobListingResponse = await fetch(`${GITbaseURL}?description=${this.state.jobSearchTerm}`)
            jobListingResponseJSON = await jobListingResponse.json()
        
        let listings = []

        for(let job of jobListingResponseJSON){
          listings.push({
            title:job.title,
            subtitle:job.type,
            logo:job.company_logo          
          })
        }
        
        await this.setState({jobListings:listings})
      }
      
    }

    render() {
      
      return (
        <View>
          <JobForm handleSkillSearch={this.handleSkillSearch}/>
          <JobList jobList={this.state.jobListings} toggleOverlay={this.toggleOverlay} findMatchingSkills={this.findMatchingSkills}/>
          <Overlay
            isVisible={this.state.isOverlayVisible}
            onBackdropPress={() => this.setState({ isOverlayVisible: false })}
          >
          {this.state.selectedJobSkills}
          </Overlay>
        </View>
      );
    }

    
}
  
export default GetJobSkillScreen