import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiEdit2, FiSearch } from 'react-icons/fi';

import { User } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import ModalUpdateTeacher from '../../components/Modal/ModalUpdateTeacher';

import { Container, Content, TableContainer } from './styles';

const Teachers: React.FC = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [toRefresh, setToRefresh] = useState(true);

  const [modalUpdateTeacherOpen, setModalUpdateTeacherOpen] = useState(false);

  const [teacherSearch, setTeacherSearch] = useState('');
  const [teachers, setTeachers] = useState<User[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<User>({} as User);

  const { addToast } = useToast();

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);

      await api
        .get<User[]>(`users/all?search=${teacherSearch}`)
        .then(response => {
          setTeachers(
            response.data.filter(user => user.position === 'teacher'),
          );

          if (!response.data.length) {
            addToast({
              type: 'info',
              title: 'Nenhum professor encontrado',
            });
          }
        });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na busca por professores',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, teacherSearch]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await api.get<User[]>('users/all').then(response => {
          setTeachers(
            response.data.filter(user => user.position === 'teacher'),
          );
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na busca por professores',
        });
      } finally {
        setLoading(false);
      }
    };

    if (toRefresh) {
      loadData();
      setToRefresh(false);
    }
  }, [addToast, toRefresh]);

  const toggleModalUpdateTeacher = useCallback(() => {
    setModalUpdateTeacherOpen(!modalUpdateTeacherOpen);
  }, [modalUpdateTeacherOpen]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <ModalUpdateTeacher
        teacher={selectedTeacher}
        isOpen={modalUpdateTeacherOpen}
        setIsOpen={toggleModalUpdateTeacher}
        setToRefresh={setToRefresh}
      />

      <Header isHome />

      <Container>
        <Content>
          <strong>Professores</strong>

          <form>
            <strong>Pesquisar professor(a)</strong>
            <div>
              <input
                type="text"
                placeholder="Nome"
                value={teacherSearch}
                onChange={e => setTeacherSearch(e.target.value)}
              />

              <button type="button" onClick={handleSearch}>
                <FiSearch />
              </button>
            </div>
          </form>

          <Button
            type="button"
            onClick={() => {
              history.push('add-teacher');
            }}
          >
            + Adicionar professor(a)
          </Button>

          <TableContainer>
            <thead>
              <tr>
                <th>Professor(a)</th>
                <th>RA</th>
                <th>Email</th>
                <th>Disciplina(s)</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher.id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.ra}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.subjects}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        toggleModalUpdateTeacher();
                      }}
                    >
                      <FiEdit2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableContainer>
        </Content>
      </Container>
    </>
  );
};

export default Teachers;
