import React from 'react';
import ReactDOM from 'react-dom';
import './Weather.css';

class WeatherApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            temp: null,
            summary: null
        };
    }
    

    getWeather(latitude, longitude) {
        var that = this;
        const url = `/weather?latitude=${latitude}&longitude=${longitude}`;

        fetch(url)
            .then(data => data.json())
            .then(function(res) {
                that.setState({
                    data: res,
                    temp: res.currently.apparentTemperature,
                    summary: res.currently.summary
                });
            });
        
    }
    componentDidMount() {
        var latitude = 20.3601;
        var longitude = -71.0589;
        this.getWeather(latitude, longitude);
    }

    locationSearch(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        var latitude = data.get('latitude');
        var longitude = data.get('longitude');
        this.getWeather(latitude, longitude);
    }


    render() {
        let tempDisplay;
        if (this.state.data != null) {
            tempDisplay = `${this.state.temp} Fahrenheit`;
        }
        
        return (
            <div>
                <h1>Weather App</h1>
                <Form loadWeather={this.locationSearch.bind(this)}></Form>
                <Temperature temp={tempDisplay} summary={this.state.summary}></Temperature>
                
                
            </div>
            
        );
    }
}

class Temperature extends React.Component {

    render () {
        return (
            <div className="WeatherApp">
                <h2>{ this.props.summary }</h2>
                <h2>{ this.props.temp }</h2>
            </div>
        );
    }
}

class Form extends React.Component {

    render() {
        return (
            <form onSubmit = {this.props.loadWeather}>
                <input type="text" name="longitude" placeholder="Longitude"/>
                <input type="text" name="latitude" placeholder="Latitude"/>
                <button>Get Weather</button>
            </form>
        );
    }
}

export default WeatherApp;