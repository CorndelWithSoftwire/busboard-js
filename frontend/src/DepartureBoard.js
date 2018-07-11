import React, { Component } from 'react';
import Arrival from './Arrival';
import './DepartureBoard.css';

export default class DepartureBoard extends Component {
    render() {
        return (
            <div className="DepartureBoard">
                <h3>{this.props.board.stopPoint.commonName}</h3>
                {this.props.board.arrivals.length
                    ? <ul>{this.props.board.arrivals.map((arrival, i) => <Arrival key={i} arrival={arrival}/>)}</ul>
                    : <div>No nearby buses</div>}
            </div>
        );
    }
}
