export const getRange = async (length, limits) => {
  if (!limits) limits = [1, -1];
  if (limits[1] === -1) limits[1] = length;
  limits[0]--;
  limits[1]--;
  return limits;
  // const size = limits[1] - limits[0];
  // return [...Array(size).keys()].map(i => i + limits[0]);
};
