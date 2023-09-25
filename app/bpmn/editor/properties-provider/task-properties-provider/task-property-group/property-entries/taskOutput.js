import { TextAreaProp } from '../../../common/property-fields/textAreaProp';

export function TaskOutputProps(props) {
	const { element } = props;

	return TextAreaProp({
		element,
		id: 'task_output',
		propertyId: 'task_output',
		label: 'Task Output',
		autoResize: false,
	});
}
