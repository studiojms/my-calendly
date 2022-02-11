import { Button, Container, Heading } from '@chakra-ui/react';
import AuthenticationUtils from '../../utils/AuthenticationUtils';

export default function Schedule() {
  const logout = () => {
    AuthenticationUtils.clearAuthenticationToken();
  };

  return (
    <Container centerContent p={4}>
      <Heading>Schedule</Heading>
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
}
