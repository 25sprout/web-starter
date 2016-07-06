import React from 'react';
import styles from '../css/counter.css';

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
			<div className={styles.counter}>
				<div className={styles.number}>{this.state.number}</div>
				<div className="btn-group">
					<button
						onClick={this.handleMinus}
						className={`${styles.btn} minus`}
					>-</button>
					<button
						onClick={this.handlePlus}
						className={`${styles.btn} plus`}
					>+</button>
				</div>
			</div>
		);
	}
}

export default Counter;
