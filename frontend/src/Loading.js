import React, { Component } from 'react';

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = { dots: 3 };
    }

    componentDidMount() {
        this.timer = setInterval(() => this.setState(old => {
            return { dots: (old.dots % 3) + 1 };
        }), 300);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div className="Loading">{'.'.repeat(this.state.dots)}</div>
        );
    }
}
