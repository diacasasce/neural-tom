export function createElement(elementType, properties, parent, factory,type) {
  const element = factory.create(elementType, properties);
  if (parent) {
    element.$parent = parent;
  }
  return element;
}
