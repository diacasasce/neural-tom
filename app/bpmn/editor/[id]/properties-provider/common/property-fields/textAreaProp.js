import { useService } from "bpmn-js-properties-panel";

import { TextAreaEntry, isTextAreaEntryEdited } from '@bpmn-io/properties-panel';
import { getBusinessObject } from "bpmn-js/lib/util/ModelUtil";

export function TextAreaProp(props) {
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
        return TextArea(params)
      },
      isEdited: isTextAreaEntryEdited
    };
}

function TextArea(props) {
  const {
    element,
    id,
    propertyId,
    label,
    autoResize,
    setValue,
    getValue
  } = props;
  
  const modeling = useService('modeling');
  const debounce = useService('debounceInput');
  const translate = useService('translate');

  let options = {
    ...props,
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
    autoResize: autoResize!= null ? autoResize : true ,
    
  };

  return TextAreaEntry(options);
}
