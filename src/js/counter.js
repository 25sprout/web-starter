import $ from 'jquery';
import '../css/counter.global.css';

const main = () => {
	$('.btn.plus').click(() => {
		$('.number').text((i, num) => parseInt(num, 10) + 1);
	});

	$('.btn.minus').click(() => {
		$('.number').text((i, num) => parseInt(num, 10) - 1);
	});
};

export default main;
