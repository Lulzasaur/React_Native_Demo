import React from 'react';
import JobForm from './JobForm';
import JobList from './JobList';
import { View, Text } from 'react-native';


const APIbaseURL =  `http://api.dataatwork.org/v1`
const GITbaseURL = `https://jobs.github.com/positions.json`

class GetJobSkillScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          search:'',
          jobListings:[]
        }
        this.handleSkillSearch = this.handleSkillSearch.bind(this)
    }

    handleSkillSearch(title){
      this.setState({...this.state,search:title})      
    }

    async componentDidUpdate(prevProps,prevState,snapshot){
      
    if(prevState.search !== this.state.search){
      //normalize job title first
      // let normalizedTitleResponse = await fetch(`${APIbaseURL}/jobs/autocomplete?begins_with=${this.state.search}`),
      //     normalizedTitleResponseJSON = await normalizedTitleResponse.json(), 
      //     jobId = normalizedTitleResponseJSON[0].uuid,//normalized job uuid
      //     jobName = normalizedTitleResponseJSON[0].normalized_job_title //taking suggested normalized job name for search

      //     console.log(jobId)
      //     console.log(jobName)
      //get skills associated with normalized job title
      // let skillsResponse = await fetch(`${APIbaseURL}/jobs/${jobId}/related_skills`),
      //     skillsResponseJSON = await skillsResponse.json()

      // for(let skill of skillsResponseJSON.skills){
      //   console.log(skill.skill_name)
      // }

      //get jobs associated with normalized job title
        let jobListingResponse = await fetch(`${GITbaseURL}?description=${this.state.search}`)
            jobListingResponseJSON = await jobListingResponse.json()
        
        let listings = []

        for(let job of jobListingResponseJSON){
          listings.push({
            title:job.title,
            subtitle:job.type,
            logo:job.company_logo          
          })
        }
        
        await this.setState({...this.state,jobListings:listings})
      }
      
    }

    render() {

      return (
        <View>
          <Text>{this.state.jobSearchTitle}</Text>
          <JobForm handleSkillSearch={this.handleSkillSearch}/>
          <JobList jobList={this.state.jobListings}/>
        </View>
      );
    }

    
}
  
export default GetJobSkillScreen