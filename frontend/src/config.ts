export const config = (
  method: string,
  url: string,
  data?: { [key: string]: any },
  token?: string
) => {
  const completeUrl = `http://localhost:3001/${url}`;
  console.log(completeUrl);
  return {
    method: method,
    url: completeUrl,
    data: data,
    headers: {
      "x-access-token": token,
    },
  };
};
