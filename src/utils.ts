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

export function truncateMarkdown(content: string, maxLength = 4096): string {
  if (content.length <= maxLength) {
    return content;
  }

  const markdownBlocks = content.split(/(### .+?\n)/g);
  let truncatedContent = '';
  let currentLength = 0;

  for (const block of markdownBlocks) {
    if (currentLength + block.length > maxLength) {
      break;
    }
    truncatedContent += block;
    currentLength += block.length;
  }

  return truncatedContent;
}
