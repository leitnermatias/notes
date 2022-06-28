export function setForLocalStorage(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
}

export function getFromLocalStorage(key: string, objectCreator?: (value: any) => any, reviver?: (this: any, key: string, value: any) => any) {
    let parsed = JSON.parse(window.localStorage.getItem(key), reviver);

    if (objectCreator) {
        return parsed.map(value => objectCreator(value));
    }

    return parsed;
}

export function debounce(func: Function, timeout = 300) {
    let timer: NodeJS.Timeout;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}