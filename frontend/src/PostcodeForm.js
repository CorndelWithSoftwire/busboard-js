import React, { Component } from 'react';

export default class PostcodeForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <div className="PostcodeForm">
                <form onSubmit={this.onSubmit}>
                    <label>
                        Postcode: <input type="text" value={this.props.postcode} onChange={this.onChange} required/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }

    onChange(event) {
        this.props.onChange(event.target.value);
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }
}
