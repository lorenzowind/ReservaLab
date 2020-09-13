import React from 'react';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

import Header from '../../components/Header';

const SignIn: React.FC = () => {
  const { user } = useAuth();
  return (
    <Header isAdmin={user.position === 'admin'}>
      <Container>SignIn</Container>
    </Header>
  );
};

export default SignIn;
