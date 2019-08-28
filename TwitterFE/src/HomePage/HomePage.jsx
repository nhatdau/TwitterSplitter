import React from 'react';
import { Link } from 'react-router-dom';

import { userService } from '../_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            value: '',
            output: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    componentDidMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user'))
        });
    }

    handleChange(e) {
        var value = e.target.value;
        if (value && value.length > 50 && !value.endsWith(' ') && value.lastIndexOf(' ') < value.length - 51) {
            alert('You had a span of non-whitespace characters longer than 50 characters');
            value = value.substring(0, value.length - 1);
        }
        this.setState({value: value});
    }

    handleSend(e) {
        var arrMessages = userService.splitMessage(this.state.value);
        var output = arrMessages.reduce((s, item) => s + item + "\n", "");
        this.setState({output: this.state.output + output});
    }

    render() {
        const { user} = this.state;
        return (
            <div>
                <div>
                    <h1>Hi {user.firstName}!</h1>
                </div>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-8">
                            <div class="form-group">
                                <label for="input">Type your message</label>
                            <textarea class="form-control" id="input" rows="3" cols="100" value={this.state.value} onChange={this.handleChange}></textarea>
                            </div>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-primary btn-sm" onClick={this.handleSend}>Send</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                                <OutputComponent output={this.state.output}/>
                        </div>
                    </div>
                </div>
                <div>
                    <p>
                        <Link to="/login">Logout</Link>
                    </p>
                </div>
            </div>
            );
    }
}

class OutputComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="card border-success mb-3">
                <div class="card-header bg-transparent border-success">Output:</div>
                <div class="card-body text-success">
                  <p class="card-text">{this.props.output}</p>
                </div>
            </div>
        );
    }
}
export { HomePage };
