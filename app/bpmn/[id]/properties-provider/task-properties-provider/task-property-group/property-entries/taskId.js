import { TextFieldProp } from '../../../common/property-fields/textFieldProp'

export function TaskIdProps(props) {
	const { element } = props

	return TextFieldProp({
		element,
		id: 'id',
		propertyId: 'id',
		label: 'Task Id',
	})
}
