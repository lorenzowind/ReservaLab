import React, { useCallback, useEffect, useState } from 'react';
import { FiBell, FiTrash, FiUser } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { useNotifications } from '../../hooks/notifications';
import { useCurrentPage } from '../../hooks/currentPage';

import {
  Container,
  UserAvatar,
  NotificationIcon,
  NotificationSubIcon,
  NotificationItem,
  SubContainer,
  PageButton,
  SubButton,
} from './styles';

import logoImg from '../../assets/logo.svg';

import Loading from '../Loading';

interface HeaderProps {
  isHome: boolean;
}

function getType(type: 'schedules' | 'support' | 'programs') {
  switch (type) {
    case 'schedules': {
      return 'AGENDAMENTOS';
    }
    case 'support': {
      return 'SUPORTE';
    }
    case 'programs': {
      return 'PROGRAMAS';
    }
    default: {
      return '';
    }
  }
}

function getNotificationSelection(
  type: 'schedules' | 'support' | 'programs',
  location: string,
) {
  switch (type) {
    case 'schedules': {
      return location === '/home';
    }
    case 'support': {
      return location === '/support';
    }
    case 'programs': {
      return location === '/programs';
    }
    default: {
      return false;
    }
  }
}

const Header: React.FC<HeaderProps> = ({ isHome }) => {
  const history = useHistory();
  const location = useLocation();

  const { user, signOut } = useAuth();
  const { addToast } = useToast();
  const { notifications, getNotifications } = useNotifications();
  const { page, setCurrentPage } = useCurrentPage();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname, setCurrentPage]);

  const handleDeleteNotification = useCallback(
    async (id: string) => {
      try {
        setLoading(true);

        await api.delete(`notifications/${id}`);

        getNotifications();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao excluir notificação',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, getNotifications],
  );

  return (
    <>
      {loading && <Loading zIndex={1} />}

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
            {notifications.length ? (
              <NotificationSubIcon>{notifications.length}</NotificationSubIcon>
            ) : (
              <></>
            )}

            <FiBell />

            <aside>
              {notifications.length ? (
                notifications.map(notification => (
                  <NotificationItem
                    isSelected={getNotificationSelection(
                      notification.type,
                      location.pathname,
                    )}
                    key={notification.id}
                  >
                    <section>
                      <h3>{getType(notification.type)}</h3>
                      <strong>{notification.description}</strong>
                      <h2>
                        {new Date(notification.created_at).toLocaleDateString()}
                      </h2>
                    </section>

                    <button
                      type="button"
                      onClick={() => handleDeleteNotification(notification.id)}
                    >
                      <FiTrash />
                    </button>
                  </NotificationItem>
                ))
              ) : (
                <article>
                  <strong>Você não tem notificações!</strong>
                </article>
              )}
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
          <PageButton isSelected={page === '/home'}>
            <button type="button" onClick={() => history.push('/home')}>
              Agendamentos
            </button>
          </PageButton>

          <PageButton isSelected={page === '/support'}>
            <button type="button" onClick={() => history.push('/support')}>
              Suporte
            </button>
          </PageButton>

          <PageButton isSelected={page === '/programs'}>
            <button type="button" onClick={() => history.push('/programs')}>
              Programas
            </button>
          </PageButton>

          <PageButton isSelected={page === '/reports'}>
            <button type="button" onClick={() => history.push('/reports')}>
              Relatórios
            </button>
          </PageButton>

          {user.position === 'admin' && (
            <>
              <PageButton isSelected={page === '/teachers'}>
                <button type="button" onClick={() => history.push('/teachers')}>
                  Professores
                </button>
              </PageButton>

              <PageButton isSelected={page === '/configurations'}>
                <nav>Configurações</nav>

                <aside>
                  <article>
                    <SubButton
                      type="button"
                      isSelected={
                        `${page}?ctx=lbrt` ===
                        `/configurations${location.search}`
                      }
                      onClick={() => history.push('/configurations?ctx=lbrt')}
                    >
                      Mapa de laboratórios
                    </SubButton>

                    <SubButton
                      type="button"
                      isSelected={
                        `${page}?ctx=scdl` ===
                        `/configurations${location.search}`
                      }
                      onClick={() => history.push('/configurations?ctx=scdl')}
                    >
                      Horários
                    </SubButton>

                    <SubButton
                      type="button"
                      isSelected={
                        `${page}?ctx=sbjc` ===
                        `/configurations${location.search}`
                      }
                      onClick={() => history.push('/configurations?ctx=sbjc')}
                    >
                      Disciplinas
                    </SubButton>

                    <SubButton
                      type="button"
                      isSelected={
                        `${page}?ctx=clrm` ===
                        `/configurations${location.search}`
                      }
                      onClick={() => history.push('/configurations?ctx=clrm')}
                    >
                      Turmas
                    </SubButton>
                  </article>
                </aside>
              </PageButton>
            </>
          )}
        </div>
      </SubContainer>
    </>
  );
};

export default Header;
