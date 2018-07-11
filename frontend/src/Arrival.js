import React, { Component } from 'react';

export default class Arrival extends Component {
    render() {
        const arrival = this.props.arrival;
        return (
            <li className="Arrival">
                {Math.round(arrival.timeToStation / 60)} minutes: {arrival.lineName} to {arrival.destinationName}
            </li>
        );
    }
}
