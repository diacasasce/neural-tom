
import TaskPropertyGroup from './task-property-group/taskPropertyGroup';
import NextTaskGroup from './next-task-group/nextTaskGroup';
import TestCaseGroup from './test-case-group/testCaseGroup';

const customGroups = [
  TaskPropertyGroup,
  TestCaseGroup,
  NextTaskGroup
];

export default class TaskPropertyProvider {
  constructor(propertiesPanel, injector) {
    propertiesPanel.registerProvider(500, this);
    this._injector = injector
  }

  getGroups(element) {
    return (groups) => {
      groups = groups.concat(this._getGroups(element));
      return groups.filter(group => group !== null);
    };
  }
   _getGroups(element) {
    const groups = customGroups.map(createGroup => createGroup(element, this._injector));
    return groups;
   }
}

TaskPropertyProvider.$inject = [ 'propertiesPanel', 'injector' ];