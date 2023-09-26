import { Group } from '@bpmn-io/properties-panel';
import { LaneDescriptionProps, LaneNameProps, LaneCanCreateProps, LaneCanReadProps, LaneCanUpdateProps, LaneCanDeleteProps } from './property-entries';
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

export default function TaskPropertyGroup (element) {
  if (!is(element, 'bpmn:Lane' )) return null;
  return {
    label: 'Lane Properties',
    id: 'LanePropertyGroup',
    component: Group,
    entries: [
      LaneNameProps({element}),
      LaneDescriptionProps({element}),
      {
        label: 'Permissions',
        id: 'LanePermissions',
        component: Group,
        entries: [
          LaneCanCreateProps({element}),
          LaneCanReadProps({element}),
          LaneCanUpdateProps({element}),
          LaneCanDeleteProps({element}),
        ]
      },
    ]
  };
}