export const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

export const getPageQuery = (webUrl: string = window.location.href) => {
  const url = new URL(webUrl);
  const urlParams: Record<string, any> = {};
  for (const [key, value] of url.searchParams.entries()) {
    Object.assign(urlParams, { [key]: value });
  }
  return urlParams;
};

export const stringify = (obj: Record<string, any>): string => {
  let parts: string[] = [];
  for (let key in obj) {
    let value = obj[key];
    if (value === undefined) {
      continue;
    }
    if (Array.isArray(value)) {
      value.forEach((v) => {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
      });
    } else {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }
  return parts.join("&");
};

export const parse = (query: string): Record<string, any> => {
  let obj: any = {};
  let parts = query.split("&");
  for (let part of parts) {
    let [key, value] = part.split("=");
    key = decodeURIComponent(key);
    value = decodeURIComponent(value);
    if (obj[key] === undefined) {
      obj[key] = value;
    } else if (Array.isArray(obj[key])) {
      obj[key].push(value);
    } else {
      obj[key] = [obj[key], value];
    }
  }
  return obj;
};
