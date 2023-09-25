import { TextAreaProp } from "../../../common/property-fields/textAreaProp";

export function LaneDescriptionProps(props) {
  const {
    element
  } = props;


  return TextAreaProp({
    element,
    id: 'lane_description',
    propertyId:'description',
    label: 'Lane Description',
    autoResize : false
  })
}

