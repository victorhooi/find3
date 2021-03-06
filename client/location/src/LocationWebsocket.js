import React from 'react';
import Websocket from 'react-websocket';
import TimeAgo from 'react-timeago'
 
class LocationWebsocket extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      family: window.find3.family,
      device: window.find3.device,
      websocket_url:window.location.origin.replace("http","ws") + "/ws?family="+window.find3.family+"&device="+window.find3.device,
      location: "?",
      probability: "",
      time:0,
    };
  }

  handleData(data) {
    let result = JSON.parse(data);
    console.log(result);
    this.setState({
      device: result.sensors.d,
      time: result.sensors.t,
      location: result.analysis.best_guess.location,
      probability: Math.round(100*result.analysis.best_guess.probability).toString() + "%",
    });
  }

  render() {
    return (
      <div>
        <TimeAgo date={this.state.time} />
        <p>Family: <strong>{this.state.family}</strong></p>
        <p>Device: <strong>{this.state.device}</strong></p>
        <p>Location: <strong>{this.state.location}</strong></p>
        <p>Probability: <strong>{this.state.probability}</strong></p>
        <p><strong>{this.state.error_message}</strong></p>

         {/* ?family=X&device=Y should come from server */}
        <Websocket url={this.state.websocket_url}
            onMessage={this.handleData.bind(this)}/>
      </div>
    );
  }
}

export default LocationWebsocket;
