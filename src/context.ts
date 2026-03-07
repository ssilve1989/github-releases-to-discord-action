import * as core from '@actions/core';
import * as github from '@actions/github';
import type { ReleasePublishedEvent } from '@octokit/webhooks-types';
import { exitWithError } from './utils.js';

export interface ReleaseContext {
  body: string | null;
  name: string;
  htmlUrl: string;
}

export function getContext() {
  core.info(JSON.stringify(github.context));
  if (github.context.eventName !== 'release') {
    return exitWithError(
      'This action can only be run on Release Published events',
    );
  }

  const payload = github.context.payload as ReleasePublishedEvent;
  return payload.release;
}
