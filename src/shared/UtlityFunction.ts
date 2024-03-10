export function convertStringToNull(obj: any) {
  Object.keys(obj).forEach(function (key) {
    if (obj[key] === "") {
      obj[key] = null;
    }
  });
  return obj;
}

export function convertNullToString(obj: any) {
  Object.keys(obj).forEach(function (key) {
    if (obj[key] === null) {
      obj[key] = "";
    }
  });

  return obj;
}

export const sumValues = (obj: object) =>
  Object.values(obj)
    .reduce((a: any, b: any) => Number(a) + Number(b), 0)
    .toFixed(2);

export function percentage(percent: any, total: any) {
  return Number((percent / 100) * total).toFixed(2);
}
