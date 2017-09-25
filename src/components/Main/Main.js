import React, { Component } from 'react';
import style from './main.scss';
import HorizontalTimeline from 'react-horizontal-timeline';
import Axios from 'Axios';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      events: [],
      patch: "",
    }
    this.indexClick = this.indexClick.bind(this);
  }

  componentDidMount() {
    Axios.get("https://api.github.com/repos/abyu/texting/commits?path=.travis.yml").then(res => {
      this.setState({events: (res.data.map(d => ({
        date: d.commit.committer.date,
        sha: d.sha,
      })))})
    });
  }

  indexClick(index) {
    this.setState({index: index});
    let commitSha = this.state.events[index].sha
    Axios.get(`https://api.github.com/repos/abyu/texting/commits/${commitSha}`).then(res => {
      this.setState({patch: res.data.files.find(f => f.filename === ".travis.yml").patch})
    });
  }

  render() {
    return (
    <div className="main">
      <span className="header">
        Greetings
      </span>
      <div style={{ width: '60%', height: '100px', margin: '0 auto' }}>
       <HorizontalTimeline
         index={this.state.index}
         indexClick={this.indexClick}
         values={ this.state.events.map(e => e.date) } />
      </div>
      <div className="patch" >
        <pre>
          {this.state.patch}
        </pre>
      </div>
  </div>)
  }
}

export default Main;
