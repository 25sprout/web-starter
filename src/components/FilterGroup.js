import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const styles = {
	display: 'inline-block',
	width: 'auto',
	marginRight: '20px',
};

const FilterGroup = ({ filter, onChange }) => (
	<RadioButtonGroup
		name="filter"
		defaultSelected={filter}
		style={{ marginTop: '20px' }}
		onChange={onChange}
	>
		<RadioButton style={styles} value="all" label="ALL" />
		<RadioButton style={styles} value="pending" label="PENDING" />
		<RadioButton style={styles} value="done" label="DONE" />
	</RadioButtonGroup>
);

export default FilterGroup;
