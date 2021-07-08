type HTTPMethod = 'GET' | 'POST';

interface FetchOptionType {
  method: HTTPMethod;
  accessToken?: string;
  payload?: unknown;
}

class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  public get<T>(path: string, accessToken?: string): Promise<T> {
    return this.request(path, { method: 'GET', accessToken });
  }

  public post<T>(path: string, payload: T, accessToken?: string) {
    return this.request(path, { method: 'POST', payload, accessToken });
  }

  private async request(path: string, option: FetchOptionType) {
    const response = await fetch(this.baseURL + path, this.fetchOption(option));
    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return data;
  }

  private fetchOption({ method, accessToken, payload }: FetchOptionType): RequestInit {
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `bearer  ${accessToken}` }),
      },
      ...(payload && { body: JSON.stringify(payload) }),
    };
  }
}

export default APIClient;
