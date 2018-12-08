import React from 'react';
import ReactDOM from 'react-dom';
import './Weather.css';
import * as moment from  'moment';


class WeatherApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            temp: null,
            summary: null,   
        };
    }
    

    getWeather(location) {
        var that = this;
        const url = `/weather?location=${location}`;

        fetch(url)
            .then(data => data.json())
            .then(function(res) {
                that.setState({
                    data: res,
                    temp: res.currently.apparentTemperature,
                    summary: res.currently.summary,
                });
            });
        
    }
    componentWillMount() {
        var latitude = 20.3601;
        var longitude = -71.0589;
        this.getWeather(latitude, longitude);
    }

    locationSearch(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        let location = data.get('location');
        this.getWeather(location);
    }


    render() {
        let tempDisplay;
        let weekTemp;
        if (this.state.data != null) {
            tempDisplay = `${this.state.temp} Fahrenheit`;
            weekTemp = this.state.data.daily;
        }
        
        return (
            <div>
                <h1>Weather App</h1>
                <Form loadWeather={this.locationSearch.bind(this)}></Form>
                <TimeDisplay></TimeDisplay>
                <Temperature temp={tempDisplay} summary={this.state.summary}></Temperature>
                <WeekDisplay weather={ weekTemp }></WeekDisplay>
                
            </div>
            
        );
    }
}

class WeekDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    //pass the props down to day display
    render () {
        let now = moment().format('dddd');

        return (
            <div className="WeekDisplay">
                <DayDisplay
                    day={ now }
                    temp={ this.props.weather ? 
                        `${this.props.weather.data[0].temperatureLow}-${this.props.weather.data[0].temperatureHigh}` : null }>
                </DayDisplay>
                <DayDisplay
                    day={ moment(new Date()).add(1, 'days').format('dddd') }
                    temp={ this.props.weather ? 
                        `${this.props.weather.data[1].temperatureLow}-${this.props.weather.data[1].temperatureHigh}` : null }>
                </DayDisplay>
                <DayDisplay
                    day={ moment(new Date()).add(2, 'days').format('dddd') }
                    temp={ this.props.weather ? 
                        `${this.props.weather.data[2].temperatureLow}-${this.props.weather.data[2].temperatureHigh}` : null }>
                </DayDisplay>
                <DayDisplay
                    day={ moment(new Date()).add(3, 'days').format('dddd') }
                    temp={ this.props.weather ? 
                        `${this.props.weather.data[3].temperatureLow}-${this.props.weather.data[3].temperatureHigh}` : null }>
                </DayDisplay>
                <DayDisplay
                    day={ moment(new Date()).add(4, 'days').format('dddd') }
                    temp={ this.props.weather ? 
                        `${this.props.weather.data[4].temperatureLow}-${this.props.weather.data[4].temperatureHigh}` : null }>
                </DayDisplay>
                <DayDisplay
                    day={ moment(new Date()).add(5, 'days').format('dddd') }
                    temp={ this.props.weather ? 
                        `${this.props.weather.data[5].temperatureLow}-${this.props.weather.data[5].temperatureHigh}` : null }>
                </DayDisplay>
                <DayDisplay
                    day={ moment(new Date()).add(6, 'days').format('dddd') }
                    temp={ this.props.weather ? 
                        `${this.props.weather.data[6].temperatureLow}-${this.props.weather.data[6].temperatureHigh}` : null }>
                </DayDisplay>
            </div>
        );
    }
}


class DayDisplay extends React.Component {
    render () {
        
        return (
            <div>
                <h4>{ this.props.day }</h4>

                <h3>{ this.props.temp}</h3>
            </div>

        )
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

class TimeDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()

        }
    }

    // componentDidMount() {
    //     this.timerID = setInterval(
    //         () => this.tick(),
    //         1000
    //     );
    // }

    // componentWillUnmount() {
    //     clearInterval(this.timerID)
    // }

    // tick() {
    //     this.setState({
    //         date: new Date()
    //     });
    // }

    render () {
        
        return (
            <div className="TimeDisplay">
                <h2>{this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}

class Form extends React.Component {

    render() {
        return (
            <form onSubmit = {this.props.loadWeather}>
                <input type="text" name="location" placeholder="Location"/>
                <button>Get Weather</button>
            </form>
        );
    }
}

export default WeatherApp;