import CustomPalette from './CustomPalette';
import CustomContextPadProvider from './CustomContextPadProvider';


export default {
  __init__: [
    'contextPadProvider',
    'paletteProvider'
  ],
  contextPadProvider: [ 'type', CustomContextPadProvider ],
  paletteProvider: [ 'type', CustomPalette ]
};
