import { getInputPath, readInput } from '../utils';
import { findResult } from '.';

test('day 08 testing', () => {
  const input = readInput(
    getInputPath(import.meta.url, './input.txt')
  ).toString();
  
  const { part1, part2 } = findResult(input);

  expect(part1).toBe(1949);
  expect(part2).toBe(2092);
});
