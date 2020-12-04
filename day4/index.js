/**
 * Advent of Code 2020
 * @author cyntl3r
 * @description https://adventofcode.com/2020/day/4
 */
import { readInput } from '../utils.js';
import { validationSchema } from './validationSchema.js';

const formatInputPart = (inputPart) =>
  inputPart
    .split('\n')
    .reduce((prev, next) => (!prev ? `${next}` : `${prev} ${next}`), '')
    .split(' ')
    .filter((val) => val)
    .map((val) => {
      const [field, value] = val.split(':');
      return {
        field: field.trim(),
        value: value.trim(),
      };
    });

const isPassportIncludesFields = (passportData) => {
  for (let { field: schemaField, optional } of validationSchema) {
    if (
      !optional &&
      !passportData.find(
        ({ field: passportField }) => passportField === schemaField
      )
    )
      return false;
  }
  return true;
};

const isPassportValid = (passportData) => {
  let errors = 0;
  for (let { field: schemaField, optional, validator } of validationSchema) {
    if (!optional) {
      const findField = passportData.find(
        ({ field: passportField }) => passportField === schemaField
      );
      if (!findField) {
        errors += 1;
      } else {
        if (!validator(findField.value)) {
          errors += 1;
        }
      }
    }
  }
  return errors === 0;
};

const findResult = (input) => ({
  part1: input.filter((inputPart) =>
    isPassportIncludesFields(formatInputPart(inputPart))
  ).length,
  part2: input.filter((inputPart) =>
    isPassportValid(formatInputPart(inputPart))
  ).length,
});

const input = readInput(true).toString();
const result = findResult(input);
console.log(result.part1, result.part2);