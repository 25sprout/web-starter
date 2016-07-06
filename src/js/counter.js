import $ from 'jquery';
import styles from '../css/counter.css';

const main = () => {
	$(`.${styles.btn}.plus`).click(() => {
		$(`.${styles.number}`).text((i, num) => parseInt(num, 10) + 1);
	});

	$(`.${styles.btn}.minus`).click(() => {
		$(`.${styles.number}`).text((i, num) => parseInt(num, 10) - 1);
	});
};

export default main;
