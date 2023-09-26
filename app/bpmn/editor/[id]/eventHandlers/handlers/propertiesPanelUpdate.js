
import { is } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

export default class PropertiesPanelUpdateHandler {
  constructor(propertiesPanel, injector, eventBus) {
    propertiesPanel.registerProvider(500, this);
    eventBus.on('propertiesPanel.updated', (event) => {
      const element = event.element;
      const panel = propertiesPanel._container.parentNode;
      if (is(element, 'bpmn:Task' )|| is(element, 'bpmn:Lane')) {
        panel.classList.remove('inactive');
      } else {
        panel.classList.add('inactive');
      }
    })
  }
  getGroups() {
    return (groups) => {
      return groups;
    };
  }

}

PropertiesPanelUpdateHandler.$inject = ['propertiesPanel', 'injector', 'eventBus'];