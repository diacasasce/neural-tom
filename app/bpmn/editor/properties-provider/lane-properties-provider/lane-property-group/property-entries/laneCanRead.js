import { ToggleFieldProp } from "../../../common/property-fields/toggleProp"

export function LaneCanReadProps(props) {
  const {
    element
  } = props;


  return ToggleFieldProp({
    element,
    id: 'canRead',
    propertyId:'canRead',
    label: 'Can Read',
    inline: true
  })
}

