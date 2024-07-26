import _ from 'lodash';

const getIndentation = (depth, countSpace = 4, shift = 2, replacer = ' ') => replacer.repeat(depth * countSpace - shift);

const formatValue = (value, depth, countSpace = 4) => {
  if (!_.isObject(value) || value === null) {
    return value;
  }
  const indentation = getIndentation(depth + 1, countSpace);
  const bracketIndentation = getIndentation(depth + 1, countSpace, countSpace);
  const formatted = Object.entries(value)
    .map(([key, val]) => `${indentation}  ${key}: ${formatValue(val, depth + 1)}`)
    .join('\n');
  return `{\n${formatted}\n${bracketIndentation}}`;
};

const getStylishFormat = (diff, depth = 1, countSpace = 4) => {
  const indentation = getIndentation(depth, countSpace);
  const bracketIndentation = getIndentation(depth, countSpace, countSpace);
  const result = diff
    .map((node) => {
      switch (node.type) {
        case 'added':
          return `${indentation}+ ${node.key}: ${formatValue(node.value, depth, countSpace)}`;
        case 'deleted':
          return `${indentation}- ${node.key}: ${formatValue(node.value, depth, countSpace)}`;
        case 'changed':
          return `${indentation}- ${node.key}: ${formatValue(node.oldValue, depth, countSpace)}\n${indentation}+ ${node.key}: ${formatValue(node.newValue, depth, countSpace)}`;
        case 'unchanged':
          return `${indentation}  ${node.key}: ${formatValue(node.value, depth, countSpace)}`;
        case 'nested':
          return `${indentation}  ${node.key}: ${getStylishFormat(node.children, depth + 1, countSpace)}`;
        default:
          throw new Error(`wrong type: ${node.type}`);
      }
    }).join('\n');
  return `{\n${result}\n${bracketIndentation}}`;
};

export default getStylishFormat;
