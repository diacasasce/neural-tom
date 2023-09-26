import { SelectFieldProp } from '../../../common/property-fields/selectProp';

export function TaskTypeProps(props) {
	const { element } = props;

	return SelectFieldProp({
		element,
		id: 'task_type',
		propertyId: 'type',
		label: 'Type',
		options: [
			{ value: 'B', label: 'BackEnd', disabled: false },
			{ value: 'F', label: 'FrontEnd', disabled: false },
		],
	});
}
