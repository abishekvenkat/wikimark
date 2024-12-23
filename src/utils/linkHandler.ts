export function isWikiLink(url: string): boolean {
  return url.includes('wikipedia.org/wiki/');
}

export function extractPageTitle(url: string): string {
  const match = url.match(/\/wiki\/([^#?]*)/);
  if (!match) {
    throw new Error('Invalid Wikipedia URL');
  }
  return decodeURIComponent(match[1]);
}

export function handleWikiLinkClick(
  event: React.MouseEvent<HTMLAnchorElement>,
  onWikiLinkClick: (url: string) => void
) {
  const link = event.currentTarget;
  if (isWikiLink(link.href)) {
    event.preventDefault();
    onWikiLinkClick(link.href);
  }
}