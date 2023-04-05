// const defaultOptions = {
//   method: "GET",
//   mode: "cors",
//   cache: "no-cache",
//   credentials: "same-origin",
//   headers: {
//     "Content-Type": "application/json",
//   },
// } as RequestInit;

export type QS = { [key: string]: any };

export interface IApiParams {
  qs?: QS;
  body?: any;
  headers?: HeadersInit;
}
export interface IRequestParam extends IApiParams {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "HEAD";
}

const defaultHeaders = {
  "Content-Type": "application/json",
};
const getDefaultOptions = () => ({
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: defaultHeaders,
});

export const getCallUrl = (path: string, qs: QS = {}): string => {
  const serverUri = process.env.REACT_APP_SERVER_URI || "";
  console.log("serverUri: ", serverUri);
  const url = new URL(serverUri);
  const urlPath = path.startsWith("/") ? path : "/".concat(path);
  url.pathname = url.pathname.concat(urlPath);
  Object.keys(qs).forEach((key) => {
    url.searchParams.append(key, qs[key]);
  });
  return url.toString();
};
export const request = async (path: string, params: IRequestParam) => {
  const { qs, ...rest } = params;
  console.log("requestParams: ", JSON.stringify(params, null, 4));
  const defaultOptions = getDefaultOptions();
  const callOptions = { ...defaultOptions, ...rest } as RequestInit;
  const url = getCallUrl(path, qs);
  const response = await fetch(url, callOptions);
  const json = await response.json();
  console.log("call fetch api json: ", json);
  // TODO: add refresh when error
  return json;
};

export const getAuthHeader = (token: string): HeadersInit => ({
  ...defaultHeaders,
  Authorization: `Bearer ${token}`,
});

const api = {
  async get(path: string, params: IApiParams = {}) {
    return request(path, { ...params, method: "GET" });
  },
  async post(path: string, params: IApiParams = {}) {
    return request(path, { ...params, method: "POST" });
  },
  async patch(path: string, params: IApiParams = {}) {
    return request(path, { ...params, method: "PATCH" });
  },
  async delete(path: string, params: IApiParams = {}) {
    return request(path, { ...params, method: "DELETE" });
  },
};

export default api;