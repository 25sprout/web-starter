import React from 'react';
import '../css/counter.global.css';

class Counter extends React.Component {
	constructor() {
		super();

		this.state = { number: 0 };

		this.handlePlus = this.handlePlus.bind(this);
		this.handleMinus = this.handleMinus.bind(this);
	}

	handlePlus() {
		this.setState({ number: this.state.number + 1 });
	}
	handleMinus() {
		this.setState({ number: this.state.number - 1 });
	}

	render() {
		return (
			<div>
				<div className="number">{this.state.number}</div>
				<div className="btn-group">
					<button
						onClick={this.handleMinus}
						className="btn minus"
					>-</button>
					<button
						onClick={this.handlePlus}
						className="btn plus"
					>+</button>
				</div>
			</div>
		);
	}
}

export default Counter;
