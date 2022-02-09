import { useState } from "react";

const useRequest = ({url, method, headers, onSuccess}) => {
  const [errors, setErrors] = useState(null);
  const [status, setStatus] = useState('');

  const doRequest = async (body) => {
    try {
      setErrors(null);
      setStatus('pending');
      const res = await fetch(url, {method, headers, body: JSON.stringify(body)});
      const data = await res.json();

      if (data?.errors) {
        setStatus('error');
        setErrors(
          <ul>
            {data.errors.map(err => <li key={err.field} >{err.message}</li>)}
          </ul>
        );
        setTimeout(() => {
          setStatus('');
        },2000);
      } else {
        setStatus('success');
        if(onSuccess) onSuccess(data);
      }
      return data;

    } catch (err) {
      console.log(err)
    }
  }

  return [doRequest, errors, status];
};

export default useRequest;