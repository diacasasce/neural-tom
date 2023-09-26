import { ToggleFieldProp } from "../../../common/property-fields/toggleProp"

export function LaneCanUpdateProps(props) {
  const {
    element
  } = props;


  return ToggleFieldProp({
    element,
    id: 'canUpdate',
    propertyId:'canUpdate',
    label: 'Can Update',
    inline: true
  })
}

