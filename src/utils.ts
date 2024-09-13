import core from '@actions/core';

export function exitWithError(message: string): never {
  core.setFailed(message);
  process.exit(-1);
}

export function getMaxDescription() {
  try {
    const max = core.getInput('max_description');
    if (typeof max === 'string' && max.length > 0) {
      // 4096 is max for Embed Description
      // https://discord.com/developers/docs/resources/channel#embed-object-embed-limits
      return Math.min(Number.parseInt(max, 10), 4096);
    }
  } catch (err) {
    core.warning(`max_description not a valid number: ${err}`);
  }
  return 4096;
}

export function limit(
  str: string,
  maxLength: number,
  url: string,
  clipAtLine = false,
) {
  if (str.length <= maxLength) {
    return str;
  }

  let replacement = clipAtLine ? '\n…' : '…';

  if (url) {
    replacement = `${clipAtLine ? '\n' : ''}([…](${url}))`;
  }

  const end = maxLength - replacement.length;

  let content = str.substring(0, end);

  const lastNewline = content.search(
    new RegExp(`[^${clipAtLine ? '\n' : 's'}]*$`),
  );

  if (lastNewline > -1) {
    content = str.substring(0, lastNewline);
  }

  return content + replacement;
}

function getTypePrefix(type: string) {
  switch (type) {
    case 'issues':
      return 'Issue #';
    case 'pull':
      return 'PR #';
    case 'commit':
      return 'Commit #';
    case 'compare':
      return '';
    default:
      return '#';
  }
}

export function formatDescription(s: string) {
  return s
    .replace(/\r/g, '')
    .replace(/<!--.*?-->/gs, '')
    .replace(
      /https:\/\/github.com\/(.+)\/(.+)\/(issues|pull|commit|compare)\/(\S+)/g,
      (match, user, repo, type, id) => {
        return `[${getTypePrefix(type) + id}](${match})`;
      },
    )
    .replace(/\n\s*\n/g, (ws) => {
      const nlCount = (ws.match(/\n/g) || []).length;
      return nlCount >= 2 ? '\n\n' : '\n';
    })
    .trim();
}
