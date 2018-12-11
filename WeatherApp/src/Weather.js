import React from 'react';
import ReactDOM from 'react-dom';
import './Weather.css';
import * as moment from  'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudDrizzle, faCloudRain, faClouds, faCloudSnow, faFog, faCloudMoon, faCloudSun, faCloud } from '@fortawesome/pro-regular-svg-icons';
import Plot from 'react-plotly.js';


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
            tempDisplay = `${this.state.temp} ${String.fromCharCode(176)}F`;
            weekTemp = this.state.data.daily;
        }
        
        return (
            <div>
                <h1>Weather App</h1>
                <Form loadWeather={this.locationSearch.bind(this)}></Form>
                <TimeDisplay></TimeDisplay>
                <Temperature temp={tempDisplay} summary={this.state.summary}></Temperature>
                <WeekDisplay weather={ weekTemp }></WeekDisplay>
                <HourDisplay hourly={ this.state.data ? this.state.data.hourly : null }></HourDisplay>
            </div>
            
        );
    }
}

class HourDisplay extends React.Component {

    getHourlyWeather(dataType, color) {
        if (this.props.hourly) {
            let times = this.props.hourly.data.map(function(hourly) {
                return hourly.time;
            });
            let data = this.props.hourly.data.map(function(hourly) {
                return hourly[dataType];
            });

            return {
                x: times,
                y: data,
                mode: 'line',
                marker: {color: color},
            };
        }
    }

    render() {
        
        let trace1 = this.getHourlyWeather('temperature', 'rgb(235,154,116)');
        let trace2 = this.getHourlyWeather('precipProbability', 'rgb(116,197,235)');
        if (trace1) {
            let tickvals = trace1.x.filter((time, index) => index % 4 === 0);
            let ticklabels  = tickvals.map(time => moment.unix(time).format('ddd hA'));
            return (
                <div>
                    <Plot
                        data={[
                            trace1
                        ]}
                        layout={ {
                            autosize: true,
                            title: 'Temperature over Next 48 hours',
                            xaxis: {
                                showticklabels: true,
                                tickangle: 45,
                                tickvals: tickvals,
                                ticktext: ticklabels,
                                ticks: 'outside',
                                tickwidth: 2,
                                ticklen: 3
                            
                            },
                            yaxis: {
                                title: `Temperature ${String.fromCharCode(176)}F`,
                                showgrid: false,
                                ticks: 'outside',
                                tickwidth: 2
                            }
                        } }
                        useResizeHandler={ true }
                        style= { {width: "100%", height: "100%"} }
                    />

                    <Plot
                        data={[
                            trace2
                        ]}
                        layout={ {
                            autosize: true,
                            title: 'Chances of Precipitation over Next 48 hours',
                            xaxis: {
                                showticklabels: true,
                                tickangle: 45,
                                ticks: 'outside',
                                tickvals: tickvals,
                                ticktext: ticklabels,
                                tickwidth: 2,
                                ticklen: 3
                            
                            },
                            yaxis: {
                                title: `Chance of Precipitation`,
                                showgrid: false,
                                ticks: 'outside',
                                tickwidth: 2
                            }
                        } }
                        useResizeHandler={ true }
                        style= { {width: "100%", height: "100%"} }
                    />
                    
                </div>
                
                
            
            );
        } else {
            return null;
        }
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
        let days = [];
        for (let i = 0; i < 7; i ++) {
            days.push(
                <DayDisplay
                    day={ moment(new Date()).add(i, 'days').format('dddd') }
                    icon={ this.props.weather ? this.props.weather.data[i].icon : null}
                    temp={ this.props.weather ? 
                        `${this.props.weather.data[i].temperatureLow}${String.fromCharCode(176)}F - ${this.props.weather.data[i].temperatureHigh}${String.fromCharCode(176)}F` : null }
                    key={`day${i}`}>
                </DayDisplay>
            );
        }

        return (
            <div className="WeekDisplay">
                {days}
            </div>
        );
    }
}


class DayDisplay extends React.Component {

    choooseIcon() {
        switch( this.props.icon ) {
            case 'rain':
                return faCloudRain;
            case 'cloudy':
                return faClouds;
            case 'snow':
                return faCloudSnow;
            case 'fog':
                return faFog;
            case 'partly-cloudy-night':
                return faCloudMoon;
            case 'partly-cloudy-day':
                return faCloudSun;
            default:
                return faCloud;
        }
        
    }


    render () {
        
        return (
            <div className="DayDisplay">
                <h4>{ this.props.day }</h4>
                <FontAwesomeIcon icon={this.choooseIcon()} />
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