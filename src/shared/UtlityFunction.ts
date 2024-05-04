/* eslint-disable @typescript-eslint/no-unused-vars */

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
  f: any,
  g: any
) => {
  const salary = Number(a);
  const currentMonthTotalDays = Number(b);
  const present = Number(c);
  const weekendLength = Number(d);
  const absent = Number(e);
  const holiday = Number(f);
  const currentMonthTotalLeave = Number(g);
  const total = (
    (salary / currentMonthTotalDays) *
    (present + weekendLength + currentMonthTotalLeave + holiday - absent)
  ).toFixed(2);

  return Number(total);
};

export const removeEmptyValue = (data: object) => {
  const result = Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) => value !== null && value !== undefined && value !== ""
    )
  );
  return result;
};

export const containsSearchTerm = (task: any, searchTerm: any) => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return Object.values(task).some((value) => {
    if (typeof value === "string" || value instanceof Date) {
      return value.toString().toLowerCase().includes(lowerCaseSearchTerm);
    }
    return false;
  });
};

export const percentageColor = (totalValue: number, getTotal: number) => {
  const percentage: any = (getTotal / totalValue) * 100;

  if (percentage > 0 && percentage < 50) {
    return { color: "error", value: percentage };
  } else if (percentage >= 50 && percentage < 75) {
    return { color: "warning", value: percentage };
  } else if (percentage >= 75 && percentage < 95) {
    return { color: "primary", value: percentage };
  } else if (percentage >= 95) {
    return { color: "success", value: percentage };
  } else {
    return null;
  }
};
