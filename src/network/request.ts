import axios, { AxiosDefaults, AxiosInstance, AxiosRequestConfig } from 'axios'

class Request {
  private instance: AxiosInstance

  constructor(config?: Partial<AxiosDefaults<any>>) {
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(config => {
      return config
    })
    this.instance.interceptors.response.use(config => {
      return config
    })
  }

  private request(config: AxiosRequestConfig) {
    return this.instance.request(config)
      .then(res => res.data)
  }

  public get(url: string, config?: Omit<AxiosRequestConfig, 'method' | 'url'>) {
    return this.request({
      method: 'GET',
      url,
      ...config
    })
  }

  public post(url: string, config?: Omit<AxiosRequestConfig, 'method' | 'url'>) {
    return this.request({
      method: 'POST',
      url,
      ...config
    })
  }

  public put(url: string, config?: Omit<AxiosRequestConfig, 'method' | 'url'>) {
    return this.request({
      method: 'PUT',
      url,
      ...config
    })
  }

  public delete(url: string, config?: Omit<AxiosRequestConfig, 'method' | 'url'>) {
    return this.request({
      method: 'DELETE',
      url,
      ...config
    })
  }
}

export default Request
