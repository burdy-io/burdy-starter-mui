export const cleanObject = (obj) => {
  if (!obj) return obj;
  return Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});
};

export const cleanObjectPropTypes = (object: any) => {
  if (typeof object !== 'object') return object;

  object = Array.isArray(object) ? [...object] : { ...object };

  Object.keys(object).forEach((key) => {
    const isObject = typeof object[key] === 'object';

    if (key.includes('$type') || key.includes('$enabled')) {
      delete object[key];
      return;
    }

    if (isObject) {
      object[key] = cleanObjectPropTypes(object[key]);
    }
  });

  return object;
};

export const getNonEmpty = (val: string | null | undefined): string | null => {
  if (typeof val !== 'string') return null;
  if (val === undefined || val === null || (val || '').trim() === '') return null;
  return val;
};
