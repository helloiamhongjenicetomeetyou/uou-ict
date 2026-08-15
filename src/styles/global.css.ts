import { globalStyle, globalFontFace } from '@vanilla-extract/css';
import theme from './theme';

export const pretendard = 'Pretendard';

globalFontFace(pretendard, {
  src: 'url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/woff2/PretendardVariable.woff2") format("woff2-variations")',
  fontWeight: '45 920',
  fontStyle: 'normal',
  fontDisplay: 'swap',
});

globalStyle('*, *::before, *::after', {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
});

globalStyle('html, body, #root', {
  width: '100%',
  minHeight: '100vh',
});

globalStyle('html', {
  fontSize: '16px',
});

globalStyle('body', {
  fontFamily: `-apple-system, system-ui, ${pretendard}, 'Segoe UI', Roboto, sans-serif`,
  fontSize: '0.875rem',
  color: theme.textPrimary,
  backgroundColor: theme.background,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('button', {
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  color: 'inherit',
});

globalStyle('input, textarea, select', {
  border: 'none',
  outline: 'none',
  fontFamily: 'inherit',
});

globalStyle('ul, ol', {
  listStyle: 'none',
});

globalStyle('img', {
  display: 'block',
  maxWidth: '100%',
});

globalStyle('table', {
  width: '100%',
  borderCollapse: 'collapse',
});

globalStyle('th, td', {
  textAlign: 'left',
});

/* 키보드 포커스는 보이게 두되, 마우스 클릭에는 링이 뜨지 않게. */
globalStyle(':focus-visible', {
  outline: `2px solid ${theme.accent}`,
  outlineOffset: '2px',
});
