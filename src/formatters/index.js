import plainFormat from './plain.js';
import stylishFormat from './stylish.js';
import jsonFormat from './json.js';

const formatter = (diff, format) => {
  switch (format) {
    case ('stylish'): return stylishFormat(diff);
    case ('plain'): return plainFormat(diff);
    case ('json'): return jsonFormat(diff);
    default: return `Wrong format ${format}`;
  }
};

export default formatter;
