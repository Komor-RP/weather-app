import React from 'react';
import ReactDOM from 'react-dom';
import './Weather.css';

class WeatherApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            temp: 49.08
        };
    }

    getWeather(e) {
        e.preventDefault();
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

    render() {
        let tempDisplay = `${this.state.temp} Fahrenheit`;
        return (
            <div>

                <Temperature temp={tempDisplay} ></Temperature>
                <Form loadWeather={this.getWeather.bind(this)}></Form>
                
            </div>
            
        );
    }
}

class Temperature extends React.Component {

    render () {
        return (
            <div className="WeatherApp">
                <h1>{ this.props.temp }</h1>
            </div>
        );
    }
}

class Form extends React.Component {

    render() {
        return (
            <form onSubmit = {this.props.loadWeather}>
                <input type="text" name="location" placeholder="Zip Code..."/>
                <button>Get Weather</button>
            </form>
        );
    }
}

export default WeatherApp;