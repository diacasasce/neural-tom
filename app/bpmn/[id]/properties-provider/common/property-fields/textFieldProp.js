import { useService } from 'bpmn-js-properties-panel';

import {
	TextFieldEntry,
	isTextFieldEntryEdited,
} from '@bpmn-io/properties-panel';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export function TextFieldProp(props) {
	const { id } = props;

	return {
		id: `${id}-prop`,
		component: (properties) => {
			const params = {
				...props,
				...properties,
			};
			return TextField(params);
		},
		isEdited: isTextFieldEntryEdited,
	};
}

function TextField(props) {
	const { element, id, propertyId, label, setValue, getValue, disabled } =
		props;

	const modeling = useService('modeling');
	const debounce = useService('debounceInput');
	const translate = useService('translate');

	let options = {
		element,
		id,
		label: translate(label),
		debounce,
		setValue: setValue
			? setValue({ modeling, props })
			: (value) => {
					modeling.updateProperties(element, {
						[propertyId]: value,
					});
			  },
		getValue: getValue
			? getValue({ props })
			: (element) => {
					const businessObject = getBusinessObject(element);
					return businessObject.get(propertyId);
			  },
		disabled,
	};

	return TextFieldEntry(options);
}
