import { describe, expect, it } from 'vitest';
import { truncateMarkdown } from './utils.js';

const SMALL_CONTENT = `### Header 1
Some content here.

### Header 2
More content here that might be very long and needs to be truncated.`;

const LARGE_CONTENT = `### Header 1
Some content here.

### Header 2
More content here that might be very long and needs to be truncated. ${'A'.repeat(2000)}

### Header 3
Even more content that might be very long and needs to be truncated. ${'B'.repeat(2000)}

### Header 4
This content will be excluded because it exceeds the 4096 character limit. ${'C'.repeat(1000)}

### Header 5
This content will also be excluded. ${'D'.repeat(1000)}`;

describe('#truncateMarkdown', () => {
  it('does not truncate a string that is under the limit', () => {
    const res = truncateMarkdown(SMALL_CONTENT);
    expect(res).toEqual(SMALL_CONTENT);
  });

  it('truncates a string that is over the limit', () => {
    const res = truncateMarkdown(LARGE_CONTENT);
    // TODO: assert full content?
    expect(res.length).toBeLessThan(4096);
  });
});
