import _ from 'lodash';

const getSpaces = (depth, countSpace = 4, replacer = ' ') => replacer.repeat(depth * countSpace - 2);

const formatValue = (value, depth, countSpace = 4) => {
  if (!_.isObject(value) || value === null) {
    return value;
  }
  const spaces = getSpaces(depth + 1, countSpace);
  const formatted = Object.entries(value)
    .map(([key, val]) => `${spaces}  ${key}: ${formatValue(val, depth + 1)}`)
    .join('\n');
  return `{\n${formatted}\n}`;
};

const stylishFormatter = (diff, depth = 1, countSpace = 4) => {
  const spaces = getSpaces(depth, countSpace);
  const sortedDiff = _.sortBy(diff, 'key');
  const result = sortedDiff
    .map((node) => {
      switch (node.type) {
        case 'added':
          return `${spaces}+ ${node.key}: ${formatValue(node.value, depth, countSpace)}`;
        case 'deleted':
          return `${spaces}- ${node.key}: ${formatValue(node.value, depth, countSpace)}`;
        case 'changed':
          return `${spaces}- ${node.key}: ${formatValue(node.oldValue, depth, countSpace)}\n${spaces}+ ${node.key}: ${formatValue(node.newValue, depth, countSpace)}`;
        case 'unchanged':
          return `${spaces}  ${node.key}: ${formatValue(node.value, depth, countSpace)}`;
        default:
          throw new Error(`wrong type: ${node.type}`);
      }
    }).join('\n');
  return `{\n${result}\n}`;
};

export default stylishFormatter;
