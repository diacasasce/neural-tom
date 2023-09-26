import { TextFieldProp } from "../../../common/property-fields/textFieldProp";

export function TaskNameProps(props) {
  const {
    element
  } = props;


  return TextFieldProp({
    element,
    id: 'name',
    propertyId:'name',
    label: 'Task Name',
  })
}

