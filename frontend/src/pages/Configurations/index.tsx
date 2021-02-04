import React, { useState } from 'react';

import Header from '../../components/Header';
import Loading from '../../components/Loading';

import { Container } from './styles';

const Configurations: React.FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Header isHome />

      <Container />
    </>
  );
};

export default Configurations;
