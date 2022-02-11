import { Container, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Login from '../components/Login';
import Schedule from '../components/Schedule';
import AuthenticationUtils from '../utils/AuthenticationUtils';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState();

  useEffect(() => {
    setLoading(true);

    const authentication = AuthenticationUtils.getAuthenticationToken();
    setAuth(authentication);

    setLoading(false);
  }, [auth]);

  if (loading) {
    return (
      <Container p={4}>
        <Spinner />
      </Container>
    );
  }

  return auth ? <Schedule /> : <Login onAuth={setAuth} />;
}
