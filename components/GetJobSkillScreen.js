import React from 'react';
import JobForm from './JobForm';
import JobList from './JobList';
import { View, Text, ScrollView } from 'react-native';
import { Overlay } from 'react-native-elements';

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

    handleSkillSearch(searchTerm){
      this.setState({jobSearchTerm:searchTerm})      
    }

    toggleOverlay(visible){
      this.setState({isOverlayVisible:visible})
    }

    async findMatchingSkills(jobTitle){
      // normalize job title first
      let normalizedTitleResponse = await fetch(`${APIbaseURL}/jobs/normalize?job_title=${jobTitle}`),
          normalizedTitleResponseJSON = await normalizedTitleResponse.json(), 
          jobId = normalizedTitleResponseJSON[0].uuid//normalized job uuid

      
      //get skills associated with normalized job title
      let skillsResponse = await fetch(`${APIbaseURL}/jobs/${jobId}/related_skills`),
          skillsResponseJSON = await skillsResponse.json(),
          skills = []

      if(!skillsResponseJSON.error){
        for(let [index,skill] of skillsResponseJSON.skills.entries()){
          skills.push(<Text key={index}>{skill.skill_name}</Text>)
        }
      } else{
        skills.push(<Text>No associated skills found for this position</Text>)        
      }

      await this.setState({selectedJobSkills:skills})
    }

    async componentDidUpdate(prevProps,prevState,snapshot){
      
      if(prevState.jobSearchTerm !== this.state.jobSearchTerm){
      
      //get jobs associated with normalized job title
        let jobListingResponse = await fetch(`${GITbaseURL}?description=${this.state.jobSearchTerm}`)
            jobListingResponseJSON = await jobListingResponse.json()
        
        let listings = []

        for(let [index,job] of jobListingResponseJSON.entries()){
          listings.push({
            title:job.title,
            subtitle:job.type,
            logo:job.company_logo,
            id:index         
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
            <Text h2>Skills Needed:</Text>
            <ScrollView>
              {this.state.selectedJobSkills}
            </ScrollView>
          </Overlay>
        </View>
      );
    }

    
}
  
export default GetJobSkillScreen