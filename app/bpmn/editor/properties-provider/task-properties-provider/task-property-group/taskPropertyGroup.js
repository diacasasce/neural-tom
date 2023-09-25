import { Group } from '@bpmn-io/properties-panel';
import {
	TaskIdProps,
	TaskNameProps,
	TaskDescriptionProps,
	TaskInputProps,
	TaskOutputProps,
	TaskTypeProps,
	TaskFrontProps,
} from './property-entries';
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

export default function TaskPropertyGroup(element) {
	if (!is(element, 'bpmn:Task')) return null;
	return {
		label: 'Task Properties',
		id: 'TaskPropertyGroup',
		component: Group,
		entries: [
			TaskIdProps({ element }),
			TaskNameProps({ element }),
			TaskTypeProps({ element }),
			TaskDescriptionProps({ element }),
			TaskFrontProps({ element }),
			TaskInputProps({ element }),
			TaskOutputProps({ element }),
		],
	};
}
