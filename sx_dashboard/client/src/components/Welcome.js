import React, { Component } from 'react';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Chart from 'react-apexcharts';
import ListItem from './ListItem';

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_success
      launch_year
    }
  }
`;

class Welcome extends Component {

  render() {
    return (
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if(loading) return 'waiting'
            data = data['launches']
            const total_no_of_launches = data.length
            let no_of_successful_launches = 0;
            let no_of_unsuccessful_launches = 0;
            const labels = ["Success", "Failure"];
            const pie_chart_options = { labels: labels};
            let years_launches = {}
            for(let i in data){
              if(data[i]['launch_success']){
                no_of_successful_launches += 1
              }else{
                no_of_unsuccessful_launches += 1
              }
              if(data[i]['launch_year'] in years_launches){
                years_launches[data[i]['launch_year']] += 1
              }else{
                years_launches[data[i]['launch_year']] = 1
              }
            }
            let temp = []
            for(let i in years_launches){
              temp.push(years_launches[i])
            }
            const pie_chart_series = [no_of_successful_launches, no_of_unsuccessful_launches];
            const line_chart_series = [{name: "s1", data: temp}]
            const line_chart_options = {
              chart: {
                id: "basic-bar"
              },
              xaxis: {
                categories: Object.keys(years_launches)
              }
            };      
            return (
            <div className = "container">
              <div className = "title">
                SpaceX Dashboard
              </div>
              <div className = "body">
                <div className = "display-counts">
                    <div className = "count">
                      Number of total launches: {total_no_of_launches}
                    </div>
                </div>
                <div className = "charts">
                  <div className = "chart">
                    <Chart options = {pie_chart_options} series={pie_chart_series} type="donut" width="425" />
                  </div>
                  <div className = "chart">
                    <Chart
                      options={line_chart_options}
                      series={line_chart_series}
                      type="bar"
                      width="600"
                    />
                  </div>
                </div>
                <div className = "list">
                  {data.map(record => (<ListItem key = {record['flight_number']} flight_number = {record['flight_number']} mission_name = {record['mission_name']} launch_success = {record['launch_success']} launch_year = {record['launch_year']}/>))}
                </div>
              </div>
            </div>
            );
          }}
        </Query>
    );
  }
}

export default Welcome;
