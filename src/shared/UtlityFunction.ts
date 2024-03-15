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

export const calculateSalary = (
  a: any,
  b: any,
  c: any,
  d: any,
  e: any,
  f: any
) => {
  const salary = a;
  const currentMonthTotalDays = b;
  const present = c;
  const weekendLength = d;
  const absent = e;
  const holiday = f;
  const total = (
    (salary / currentMonthTotalDays) *
    (present + (currentMonthTotalDays - weekendLength) + holiday - absent)
  ).toFixed(2);

  return Number(total);
};
