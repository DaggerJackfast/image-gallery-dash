export type QS = { [key: string]: any };

export interface IApiParams {
  qs?: QS;
  body?: any;
  headers?: HeadersInit;
  baseUrl?: string;
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

export const getCallUrl = (path: string, params: IApiParams = {}): string => {
  const { qs, baseUrl } = params;
  const serverUri = baseUrl || process.env.REACT_APP_SERVER_URI || "";
  const url = new URL(serverUri);
  if (path) {
    const urlPath = path.startsWith("/") ? path : "/".concat(path);
    url.pathname = url.pathname.concat(urlPath);
  }

  if (qs) {
    Object.keys(qs).forEach((key) => {
      url.searchParams.append(key, qs[key]);
    });
  }

  return url.toString();
};
export const request = async (path: string, params: IRequestParam) => {
  const { qs, baseUrl, ...rest } = params;
  const defaultOptions = getDefaultOptions();
  const callOptions = { ...defaultOptions, ...rest } as RequestInit;
  const url = getCallUrl(path, { qs, baseUrl });
  const response = await fetch(url, callOptions);
  // TODO: add refresh when error
  if (response.status === 204) {
    return;
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }
  return await response.text();
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
  async put(path: string, params: IApiParams = {}) {
    return request(path, { ...params, method: "PUT" });
  },
  async delete(path: string, params: IApiParams = {}) {
    return request(path, { ...params, method: "DELETE" });
  },
};

export default api;
