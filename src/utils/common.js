export const getAttributes = (attributes) => {
  for (var i = 0, atts = attributes, n = atts.length, attr = {}; i < n; i++) {
    attr[atts[i].nodeName] = atts[i].textContent;
  }
  return attr;
};
