import React, { Component } from 'react';
import PostcodeForm from './PostcodeForm';
import BusList from './BusList';
import './BusBoard.css';

const SERVER_URL = 'http://localhost:3001';

export default class BusBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postcode: '',
            boards: [],
            error: null
        };

        this.onPostcodeChange = this.onPostcodeChange.bind(this);
        this.loadBuses = this.loadBuses.bind(this);
    }

    render() {
        return (
            <div className="BusBoard">
                <PostcodeForm postcode={this.state.postcode} onChange={this.onPostcodeChange} onSubmit={this.loadBuses}/>
                {this.state.error == null
                    ? <BusList boards={this.state.boards}/>
                    : <div className="error">{this.state.error}</div>}
            </div>
        );
    }

    onPostcodeChange(postcode) {
        this.setState({postcode: postcode});
    }

    loadBuses() {
        this.setState({boards: null, error: null});
        fetch(`${SERVER_URL}/departureBoards?postcode=${this.state.postcode}`)
            .then(resp => {
                if (resp.ok) {
                    resp.json().then(data => this.setState({boards: data, error: null}))
                } else if (resp.status === 404) {
                    this.setState({boards: null, error: 'Invalid postcode or no nearby stops'});
                } else {
                    throw new Error(`Unexpected status code ${resp.status}`);
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({boards: null, error: 'An unexpected error occurred'});
            });
    }
}
