import plainFormat from './plain.js';
import stylishFormat from './stylish.js';

const formatter = (diff, format) => {
  switch (format) {
    case ('stylish'): return stylishFormat(diff);
    case ('plain'): return plainFormat(diff);
    default: return `Wrong format ${format}`;
  }
};

export default formatter;
