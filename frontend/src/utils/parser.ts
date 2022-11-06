export const parse = (str: string, ...rest: string[]) => {
  var args = [].slice.call(rest, 1),
      i = 0;

  return str.replace(/%s/g, () => args[i++]);
};
