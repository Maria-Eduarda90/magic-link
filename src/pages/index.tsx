import {  Container } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';

const Home: NextPage = () => {

  const router = useRouter();
  const { user, isLoading, token } = useLogin();

  console.log('user: ', user);
  console.log('token: ', token);

  useEffect(() => {
    if (!user && !token) {
      router.push("/login")
    }
  }, [user, isLoading, router])
  if (isLoading) {
    return <div>Loading</div>
  } else {
    return (
      <Container>
        Bem vindo :)
      </Container>
    )
  }
}
export default Home
