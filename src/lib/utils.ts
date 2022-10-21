type Status = 'pending' | 'success' | 'error';

type KeysOf<T extends PropertyKey> = {
    [Key in T]: any
} 

export function wrapPromise<T>(promise: Promise<T>) {
    let status: Status = 'pending';
    let response: T;
  
    const suspender = promise.then(
      res => {
        status = 'success';
        response = res;
      },
      err => {
        status = 'error';
        response = err;
      },
    );
  
    const handler: KeysOf<Status> = {
      pending: () => {
        throw suspender;
      },
      error: () => {
        throw response;
      },
      success: () => response,
    };
  
    const read = () => {
      const result = handler[status] ? handler[status]() : handler['success']();
      return result;
    };
  
    return { read };
  }