import React from 'react';

import 'react-day-picker/lib/style.css';

import { useAuth } from '../../hooks/auth';

import Header from '../../components/Header';

import { Container } from './styles';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Header isAdmin={user.position === 'admin'} />

      <Container>Profile</Container>
    </>
  );
};

export default Profile;
