import plainFormat from './plain.js';
import stylishFormat from './stylish.js';

const getFormatted = (diff, format) => {
  switch (format) {
    case ('stylish'): return stylishFormat(diff);
    case ('plain'): return plainFormat(diff);
    case ('json'): return JSON.stringify(diff);
    default: return `Wrong format ${format}`;
  }
};

export default getFormatted;
