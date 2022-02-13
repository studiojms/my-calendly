import { Container, Spinner } from '@chakra-ui/react';

import { useAuth } from '../components/Auth';
import Login from '../components/Login';
import Schedule from '../components/Schedule';

export default function Home() {
  const [auth] = useAuth();

  if (auth.loading) {
    return (
      <Container p={4}>
        <Spinner />
      </Container>
    );
  }

  return auth.user ? <Schedule /> : <Login />;
}
