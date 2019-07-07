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