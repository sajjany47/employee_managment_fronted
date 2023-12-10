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
