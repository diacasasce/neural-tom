import { TextAreaProp } from '../../../common/property-fields/textAreaProp';

export function TaskDescriptionProps(props) {
	const { element } = props;

	return TextAreaProp({
		element,
		id: 'task_description',
		propertyId: 'task_description',
		label: 'Task Description',
		autoResize: false,
	});
}
