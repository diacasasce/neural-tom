import { ToggleFieldProp } from "../../../common/property-fields/toggleProp"

export function LaneCanDeleteProps(props) {
  const {
    element
  } = props;


  return ToggleFieldProp({
    element,
    id: 'canDelete',
    propertyId:'canDelete',
    label: 'Can Delete',
    inline: true
  })
}

