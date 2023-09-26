import { useService } from "bpmn-js-properties-panel";

import { ToggleSwitchEntry, isToggleSwitchEntryEdited  } from '@bpmn-io/properties-panel';
import { getBusinessObject } from "bpmn-js/lib/util/ModelUtil";

/**
 * @param {Object} props
 * @param {Object} props.element
 * @param {String} props.id
 * @param {String} props.description
 * @param {String} props.label
 * @param {String} props.switcherLabel
 * @param {Boolean} props.inline
 * @param {Function} props.getValue
 * @param {Function} props.setValue
 * @param {Function} props.onFocus
 * @param {Function} props.onBlur
 * @param {string|import('preact').Component} props.tooltip
 */
// function ToggleSwitchEntry(props) {

export function ToggleFieldProp(props) {
  const {
    id    
  } = props;

  return {
      id:`${id}-prop`,
      component: (properties) =>{ 
        const  params = {
          ...props,
          ...properties
        }
        return ToggleField(params)
      },
      isEdited: isToggleSwitchEntryEdited,
    };
}

function ToggleField(props) {
  const {
    element,
    id,
    propertyId,
    label,
    setValue,
    getValue,
    inline,
  } = props;
  
  const modeling = useService('modeling');
  const debounce = useService('debounceInput');
  const translate = useService('translate');

  let options = {
    element,
    id,
    label: translate(label),
    debounce,
    setValue: setValue? setValue({modeling,props}) : (value) => {
      modeling.updateProperties(element, {
        [propertyId]: value
      });
    },
    getValue: getValue? getValue({props}) : (element) => {
      const businessObject = getBusinessObject(element);
      return businessObject.get(propertyId);
    },
    inline
  };

  return ToggleSwitchEntry(options);
}
