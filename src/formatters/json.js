const checkNested = (node) => {
  if (node.type === 'nested') {
    const childie = node.children.reduce((acc, item) => ({ ...acc, [item.key]: [item.value] }), {});
    return childie;
  }
  return node;
};

const formatterJson = (diff) => {
  const mappedDiff = diff.reduce((acc, node) => (
    { ...acc, [node.key]: checkNested(node) }), {});
  const result = JSON.stringify(mappedDiff);
  return result;
};
export default formatterJson;
