import React, { Component } from 'react';
import DepartureBoard from './DepartureBoard';
import Loading from "./Loading";

export default class BusList extends Component {
    render() {
        return (
            <div className="BusList">
                <h2>Results</h2>
                {this.props.boards == null
                    ? <Loading/>
                    : this.props.boards.length
                        ? this.props.boards.map(board => <DepartureBoard key={board.stopPoint.naptanId} board={board}/>)
                        : <div>No results!</div>
                }
            </div>
        );
    }
}
