
import LanePropertyGroup from './lane-property-group/LanePropertyGroup';

const customGroups = [
  LanePropertyGroup
];

export default class LanePropertyProvider {
  constructor(propertiesPanel) {
    propertiesPanel.registerProvider(500, this);
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

LanePropertyProvider.$inject = [ 'propertiesPanel' ];