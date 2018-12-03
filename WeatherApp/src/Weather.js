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
    

    getWeather(e=null) {
        if (e) {
            e.preventDefault();
        }
        
        var that = this;
        fetch('/weather')
            .then(data => data.json())
            .then(function(res) {
                that.setState({
                    data: res,
                    temp: res.currently.apparentTemperature
                });
            });
        
    }
    componentDidMount() {
        var that = this;
        fetch('/weather')
            .then(data => data.json())
            .then(function(res) {
                that.setState({
                    data: res,
                    temp: res.currently.apparentTemperature,
                    summary: res.currently.summary
                });
            });
    }


    render() {
        let tempDisplay;
        if (this.state.data != null) {
            tempDisplay = `${this.state.temp} Fahrenheit`;
        }
        
        return (
            <div>
                <h1>Weather App</h1>
                <Form loadWeather={this.getWeather.bind(this)}></Form>
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