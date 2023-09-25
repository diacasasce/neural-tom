import { ToggleFieldProp } from "../../../common/property-fields/toggleProp"

export function LaneCanCreateProps(props) {
  const {
    element
  } = props;


  return ToggleFieldProp({
    element,
    id: 'canCreate',
    propertyId:'canCreate',
    label: 'Can Create',
    inline: true
  })
}

