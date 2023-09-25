import { ListGroup } from '@bpmn-io/properties-panel';
import TestCaseProps from './testCaseProps';
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
 
export default function TestCaseGroup (element, injector) {
  const translate = injector.get('translate');
  if (!is(element, 'bpmn:Task' )) return null;
  return {
    id: 'TestCaseGroup',
    label: translate('Test Cases'),
    component: ListGroup,
    ...TestCaseProps({element,injector}),
  };
}