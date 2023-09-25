import inherits from 'inherits';

import ContextPadProvider from 'bpmn-js/lib/features/context-pad/ContextPadProvider';
import {
  bind
} from 'min-dash';


export default function CustomContextPadProvider(injector) {

  injector.invoke(ContextPadProvider, this);

  var cached = bind(this.getContextPadEntries, this);

  this.getContextPadEntries = function(element) {
    var actions = cached(element);
    //remove unused actions
    delete actions.replace;
    delete actions["append.gateway"];
    delete actions["append.text-annotation"];
    delete actions["append.intermediate-event"];
    return actions;
  };
}

inherits(CustomContextPadProvider, ContextPadProvider);

CustomContextPadProvider.$inject = [
  'injector',
];