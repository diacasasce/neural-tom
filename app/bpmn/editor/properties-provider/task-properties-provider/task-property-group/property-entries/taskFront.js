import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import { TextAreaProp } from '../../../common/property-fields/textAreaProp';

export function TaskFrontProps(props) {
	const { element } = props;
	const disabled = getBusinessObject(element).get('type') == 'B';
	return TextAreaProp({
		element,
		id: 'task_front',
		propertyId: 'task_front',
		label: 'Task Frontend Description',
		autoResize: false,
		disabled,
	});
}
