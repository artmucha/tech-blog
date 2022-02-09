import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Stack,
  TextField,
  FormControl,
} from '@mui/material';
import { setCookie } from 'nookies';

import { LoadingButton } from '@mui/lab';

import useRequest from 'hooks/useRequest';

const AuthForm = ({type, apiURL}) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [doRequest, errors, status] = useRequest({
    url: apiURL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    onSuccess: () => router.push('/')
  });

  const handleSubmit = async () => {
    const data = await doRequest({email, password});

    setCookie(null, 'token', data.token, {
      maxAge: 24 * 60 * 60,
      path: '/',
      secure: true,
    });
  };

  return (
    <FormControl>
      <Stack spacing={3}>
        <TextField
          autoComplete="username"
          type="email"
          label="Email"
          value={email}
          error={status === 'error'}
          helperText={'touched.email && errors.email'}
          onChange={e => setEmail(e.target.value)}
        />

        <TextField
          autoComplete="current-password"
          type="password"
          label="Hasło"
          value={password}
          error={status === 'error'}
          helperText={'text'}
          onChange={e => setPassword(e.target.value)}
        />
      </Stack>

      <LoadingButton
        size="large"
        type="submit"
        variant="contained"
        loading={status === 'pending'}
        onClick={handleSubmit}
      >
        {type === 'login' ? 'Zaloguj' : 'Zarejestruj'}
      </LoadingButton>
    </FormControl>
  );
};

export default AuthForm;