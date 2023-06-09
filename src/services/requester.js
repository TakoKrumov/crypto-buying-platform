const request = async (method, url, data) => {
  const options = {};

  if (method !== 'GET') {
      options.method = method;

      if (data) {
          options.headers = {
              'content-type': 'application/json',
          };

          options.body = JSON.stringify(data);
      }
  }

  const userData = localStorage.getItem('auth');

  if (userData) {
      const auth = JSON.parse(userData);
      
      if (auth.accessToken) {
          options.headers = {
              ...options.headers,
              'X-Authorization': auth.accessToken,
          };
      }
  }

  const response = await fetch(url, options);

  if (response.status === 204) {
      return {};
  }

  if(response.status === 403){
      localStorage.removeItem("auth");
  }

  const result = await response.json();

  if (!response.ok) {
      throw result;
  }


  return result;
};

export const get = request.bind(null,'GET');
export const post = request.bind(null,'POST');
export const put = request.bind(null,'PUT');
export const patch = request.bind(null,'PATCH');
export const del = request.bind(null,'DELETE');



