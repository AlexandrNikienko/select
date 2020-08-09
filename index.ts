import { Select } from './select/select';
import './select/styles.scss';

const select = new Select('#select', {
	placeholder: 'Please select the item',
	selectedId: null,
	data: [
		{ id: 1, value: 'Angular' },
		{ id: 2, value: 'React' },
		{ id: 3, value: 'Vue' },
		{ id: 4, value: 'Next' },
		{ id: 5, value: 'Nest' },
		{ id: 6, value: 'React Native' }
	],
	onSelect(item) {
		console.log('Selected item', item);
	}
});

(<any>window).select = select;
