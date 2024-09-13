import core from '@actions/core';
import { getContext } from './context.js';
import { exitWithError } from './utils.js';

const webhookUrl = core.getInput('webhook-url');

if (webhookUrl === '') {
  exitWithError('webhook-url is required');
}

try {
  const context = getContext();
  const embed = {
    title: context.name,
    url: context.html_url,
    description: context.body,
    footerTimestamp: new Date().toISOString(),
  };

  const requestBody = {
    embeds: [embed],
  };

  const res = await fetch(`${webhookUrl}?wait=true`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  core.info(JSON.stringify(data));
  core.info('Action completed successfully');
} catch (e: unknown) {
  if (e instanceof Error) {
    core.info(e.message);
  }
}
