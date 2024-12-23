declare module 'turndown-plugin-gfm' {
  import TurndownService from 'turndown';

  const gfm: (service: TurndownService) => void;
  export { gfm };
}
