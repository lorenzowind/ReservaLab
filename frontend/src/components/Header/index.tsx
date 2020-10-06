import React from 'react';
import { FiUser } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Container, UserAvatar } from './styles';

interface HeaderProps {
  isAdmin: boolean;
  isHome: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAdmin, isHome }) => {
  const history = useHistory();

  const { user, signOut } = useAuth();

  return (
    <Container isHome={isHome}>
      <div>
        <h1>ReservaLab</h1>

        <section>
          <strong>{isAdmin ? 'Administrador:' : 'Bem vindo,'}</strong>
          <h2>{user.name}</h2>
        </section>
      </div>

      <div>
        <button type="button" onClick={signOut}>
          Sair
        </button>

        <UserAvatar onClick={() => history.push('/profile')}>
          {user.avatar_url ? (
            <img src={user.avatar_url} alt="User Avatar" />
          ) : (
            <FiUser />
          )}
        </UserAvatar>
      </div>
    </Container>
  );
};

export default Header;
