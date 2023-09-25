import { TextFieldProp } from "../../../common/property-fields/textFieldProp";

export function LaneNameProps(props) {
  const {
    element
  } = props;


  return TextFieldProp({
    element,
    id: 'name',
    propertyId:'name',
    label: 'Role Name',
    inline: true
  })
}

