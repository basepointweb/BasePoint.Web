import { createTheme } from '@uiw/codemirror-themes'
import { tags as t } from '@lezer/highlight';
import '@fontsource/cascadia-code'

export const codeEditorTheme = createTheme({
    theme: 'dark',
    settings: {
      background: '#000',
      backgroundImage: '',
      foreground: '#fff',
      caret: '#5d00ff',
      selection: '#036dd626',
      selectionMatch: '#036dd626',
      lineHighlight: '#8a91991a',
      gutterBorder: '1px solid #ffffff10',
      gutterBackground: '#000',
      fontFamily: "'Cascadia Code', monospace",
      fontSize: '14px'
    },
    styles: [
      { tag: t.comment, color: '#3d9749' },
      { tag: t.variableName, color: '#fff' },
      { tag: t.typeName, color: '#4EC9B0' },
      { tag: [t.string, t.special(t.brace)], color: '#cd9985' },
      { tag: t.number, color: '#5c6166' },
      { tag: t.bool, color: 'blue' },
      { tag: t.null, color: '#5c6166' },
      { tag: t.keyword, color: '#569CD6' },
      { tag: t.operator, color: '#fff' },
      { tag: t.name, color: '#4EC9B0' },  
      { tag: t.function(t.variableName), color: '#dcdb96' }, 
      { tag: t.angleBracket, color: '#5c6166' },
      { tag: t.tagName, color: '#5c6166' },
      { tag: t.attributeName, color: '#5c6166' }     
    ],
  });