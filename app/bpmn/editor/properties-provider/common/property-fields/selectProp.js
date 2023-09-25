import { useService } from "bpmn-js-properties-panel";

import { SelectEntry, isSelectEntryEdited } from '@bpmn-io/properties-panel';
import { getBusinessObject } from "bpmn-js/lib/util/ModelUtil";

export function SelectFieldProp(props) {
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
        return SelectField(params)
      },
      isEdited: isSelectEntryEdited
    };
}

function SelectField(props) {
  const {
    element,
    id,
    propertyId,
    label
  } = props;
  
  const modeling = useService('modeling');
  const debounce = useService('debounceInput');
  const translate = useService('translate');

  let options = {
    element,
    id,
    label: translate(label),
    debounce,
    setValue: (value) => {
      modeling.updateProperties(element, {
        [propertyId]: value
      });
    },
    getValue: (element) => {
      const businessObject = getBusinessObject(element);
      return businessObject.get(propertyId);
    },
    getOptions: () => {
      return props.options || [];
    }
        
  };

  return SelectEntry(options);
}
