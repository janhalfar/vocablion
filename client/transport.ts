import axios, { AxiosResponse } from "axios";

// axios transport
const getTransport = (endpoint: string) => async <T>(
  method: string,
  args = []
) => {
  return new Promise<T>(async (resolve, reject) => {
    try {
      let axiosPromise: AxiosResponse<T> = await axios.post<T>(
        "http://localhost:3001" + endpoint + "/" + encodeURIComponent(method),
        JSON.stringify(args)
      );
      return resolve(axiosPromise.data);
    } catch (e) {
      return reject(e);
    }
  });
};

export interface ServiceConstructor<ST> extends Function {
  defaultEndpoint: string;
  new (transport: <T>(method: string, data?: any[]) => Promise<T>): ST;
  prototype: ST;
}

export const getClient = <T>(clientClass: ServiceConstructor<T>) => {
  return new clientClass(getTransport(clientClass.defaultEndpoint));
};
