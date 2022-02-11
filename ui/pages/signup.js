import Link from 'next/link';
import { Button } from '@chakra-ui/button';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/input';
import { Box, Container, Heading, Text } from '@chakra-ui/layout';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function Home() {
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required field'),
    password: yup.string().required('Required field'),
    username: yup.string().required('Required field'),
  });

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
    onSubmit: async (values, form) => {
      const params = { ...values, password_confirmation: values.password };
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/users`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });
      } catch (err) {
        console.error(err);
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      username: '',
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

        <FormControl id="username" p={4} isRequired>
          <InputGroup size="lg">
            <InputLeftAddon>mycalendar.com/</InputLeftAddon>
            <Input type="text" value={values.username} onChange={handleChange} onBlur={handleBlur} />
          </InputGroup>
          {touched.username && <FormHelperText textColor={'#e74c3c'}>{errors.username}</FormHelperText>}
        </FormControl>

        <Box p={4}>
          <Button colorScheme="blue" width="100%" isLoading={isSubmitting} onClick={handleSubmit}>
            Sign up
          </Button>
        </Box>

        <Container centerContent p={4}>
          <Link href="/">Already have an account? Sign in</Link>
        </Container>
      </Box>
    </Container>
  );
}
