import { Button, Container, Heading } from '@chakra-ui/react';

import { useAuth } from '../Auth';

export default function Schedule() {
  const [, { logout }] = useAuth();

  return (
    <Container centerContent p={4}>
      <Heading>Schedule</Heading>
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
}
