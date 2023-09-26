import { TextAreaProp } from '../../../common/property-fields/textAreaProp';

export function TaskInputProps(props) {
	const { element } = props;

	return TextAreaProp({
		element,
		id: 'task_input',
		propertyId: 'task_input',
		label: 'Task Input',
		autoResize: false,
	});
}
