import React from 'react'
import styled from 'styled-components'

import Head from 'next/head'
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'

export default function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert)
  }

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="https://logospng.org/download/whatsapp/logo-whatsapp-1024.png" />
        <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
      </LoginContainer>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;

  display: grid;
  place-items: center;
`

const LoginContainer = styled.div`
  padding: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid whitesmoke;
  border-radius: 5px;

  box-shadow: 0 4px 14px -3px rgba(0, 0, 0, 0.7);
`

const Logo = styled.img`
  width: 200px;
  height: 200px;

  margin-bottom: 50px;
`