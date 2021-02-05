import React, { useEffect } from 'react';
import { FiBell, FiTrash, FiUser } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useCurrentPage } from '../../hooks/currentPage';

import {
  Container,
  UserAvatar,
  NotificationIcon,
  NotificationItem,
  SubContainer,
  PageButton,
} from './styles';

import logoImg from '../../assets/logo.svg';

interface HeaderProps {
  isHome: boolean;
}

const Header: React.FC<HeaderProps> = ({ isHome }) => {
  const history = useHistory();
  const location = useLocation();

  const { user, signOut } = useAuth();
  const { page, setCurrentPage } = useCurrentPage();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname, setCurrentPage]);

  return (
    <>
      <Container isHome={isHome}>
        <div>
          <img src={logoImg} alt="Logo" />

          <section>
            <strong>
              {user.position === 'admin' ? 'Administrador:' : 'Bem vindo,'}
            </strong>
            <h2>{user.name}</h2>
          </section>
        </div>

        <div>
          <button type="button" onClick={signOut}>
            Sair
          </button>

          <NotificationIcon>
            <FiBell />

            <aside>
              {/* <NotificationItem>
                <section>
                  <strong>Notificação 01</strong>
                  <h2>19:10</h2>
                </section>

                <button type="button">
                  <FiTrash />
                </button>
              </NotificationItem> */}

              <article>
                <strong>Você não tem notificações!</strong>
              </article>
            </aside>
          </NotificationIcon>

          <UserAvatar onClick={() => history.push('/profile')}>
            {user.avatar_url ? (
              <img src={user.avatar_url} alt="User Avatar" />
            ) : (
              <FiUser />
            )}
          </UserAvatar>
        </div>
      </Container>

      <SubContainer isHome={isHome}>
        <div>
          <PageButton
            isSelected={page === '/home'}
            type="button"
            onClick={() => history.push('/home')}
          >
            Agendamentos
          </PageButton>

          <PageButton
            isSelected={page === '/support'}
            type="button"
            onClick={() => history.push('/support')}
          >
            Suporte
          </PageButton>

          <PageButton
            isSelected={page === '/programs'}
            type="button"
            onClick={() => history.push('/programs')}
          >
            Programas
          </PageButton>

          <PageButton
            isSelected={page === '/reports'}
            type="button"
            onClick={() => history.push('/reports')}
          >
            Relatórios
          </PageButton>

          {user.position === 'admin' && (
            <>
              <PageButton
                isSelected={page === '/teachers'}
                type="button"
                onClick={() => history.push('/teachers')}
              >
                Professores
              </PageButton>

              <PageButton
                isSelected={page === '/configurations'}
                type="button"
                onClick={() => history.push('/configurations')}
              >
                Configurações
              </PageButton>
            </>
          )}
        </div>
      </SubContainer>
    </>
  );
};

export default Header;
