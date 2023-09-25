import { ListGroup } from '@bpmn-io/properties-panel';
import NextTaskProps from './nextTaskProps';
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
 
export default function NextTaskGroup (element, injector) {
  const translate = injector.get('translate');
  if (!is(element, 'bpmn:Task' )) return null;
  return {
    id: 'NextTaskGroup',
    label: translate('Next Task'),
    component: ListGroup,
    ...NextTaskProps({element,injector}),
  };
}