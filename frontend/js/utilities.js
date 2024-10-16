export const urlParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const params = [...searchParams];
    const paramsObj = {};

    params.forEach((param) => {
        paramsObj[param[0]] = param[1];
    });

    return paramsObj;
}

 export const makeURL = (path) => {
    const url = `http://localhost:3200${path}`;
    return url;
}