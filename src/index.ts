import core from '@actions/core';
import { getContext } from './context.js';

const webhookUrl = core.getInput('webhook-url');
const _color = core.getInput('color');

// if (webhookUrl === '') {
//   exitWithError('webhook-url is required');
// }

// const embed = createEmbed();

// const requestBody = {
//   embeds: [embed],
// };
const context = getContext();
try {
  core.info(JSON.stringify(context));
  // const res = await fetch(`${webhookUrl}?wait=true`, {
  //   method: 'POST',
  //   body: JSON.stringify(requestBody),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // const data = await res.json();
  // core.info(JSON.stringify(data));
  // core.info('Action completed successfully');
} catch (e: unknown) {
  if (e instanceof Error) {
    core.info(e.message);
  }
}
