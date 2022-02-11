import Link from 'next/link';
import { Button } from '@chakra-ui/button';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Container, Heading, Text } from '@chakra-ui/layout';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AuthenticationUtils from '../../utils/AuthenticationUtils';

function Login({ onAuth }) {
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required field'),
    password: yup.string().required('Required field'),
  });

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    onSubmit: async (values, form) => {
      const params = { ...values, password_confirmation: values.password };
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/auth/login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        const data = await response.json();

        AuthenticationUtils.setAuthenticationToken(data);
        onAuth(data);
      } catch (err) {
        console.error(err);
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Container centerContent p={4}>
      <Heading>My Calendar</Heading>
      <Box p={4} mt={8}>
        <Text>Create your shared schedule</Text>
      </Box>
      <Box>
        <FormControl id="email" p={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input size="lg" type="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
          {touched.email && <FormHelperText textColor={'#e74c3c'}>{errors.email}</FormHelperText>}
        </FormControl>
        <FormControl id="password" p={4} isRequired>
          <FormLabel>Password</FormLabel>
          <Input size="lg" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
          {touched.password && <FormHelperText textColor={'#e74c3c'}>{errors.password}</FormHelperText>}
        </FormControl>

        <Box p={4}>
          <Button colorScheme="blue" width="100%" isLoading={isSubmitting} onClick={handleSubmit}>
            Sign in
          </Button>
        </Box>

        <Container centerContent p={4}>
          <Link href="/signup">Don&apos;t have an account? Sign up</Link>
        </Container>
      </Box>
    </Container>
  );
}

export default Login;
