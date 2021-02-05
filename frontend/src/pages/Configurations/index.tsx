import React, { useCallback, useEffect, useState } from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useSubjects, SubjectsState } from '../../hooks/subjects';
import { useClassrooms, ClassroomsState } from '../../hooks/classrooms';

import Laboratories from '../../components/Laboratories';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

import { Container, Content, ItemContainer } from './styles';

const Configurations: React.FC = () => {
  const { addToast } = useToast();
  const { subjects, setSubjects } = useSubjects();
  const { classrooms, setClassrooms } = useClassrooms();

  const [loading, setLoading] = useState(false);

  const [newSubject, setNewSubject] = useState('');
  const [currentSubjects, setCurrentSubjects] = useState(subjects);

  const [newClassroom, setNewClassroom] = useState('');
  const [currentClassrooms, setCurrentClassrooms] = useState(classrooms);

  const [selectedLaboratory, setSelectedLaboratory] = useState(0);

  useEffect(() => {
    setCurrentSubjects(subjects);
  }, [subjects]);

  useEffect(() => {
    setCurrentClassrooms(classrooms);
  }, [classrooms]);

  const handleAddNewSubject = useCallback(() => {
    if (newSubject) {
      const foundSubject = currentSubjects.find(
        subject => subject === newSubject,
      );

      if (!foundSubject) {
        setCurrentSubjects([...currentSubjects, newSubject].sort());
        setNewSubject('');
      }
    }
  }, [currentSubjects, newSubject]);

  const handleAddNewClassroom = useCallback(() => {
    if (newClassroom) {
      const foundClassroom = currentClassrooms.find(
        classroom => classroom === newClassroom,
      );

      if (!foundClassroom) {
        setCurrentClassrooms([...currentClassrooms, newClassroom].sort());
        setNewClassroom('');
      }
    }
  }, [currentClassrooms, newClassroom]);

  const handleRemoveSubject = useCallback((index: number) => {
    setCurrentSubjects(state =>
      state.reduce(
        (newCurrentSubjects: string[], currentSubject, currentIndex) => {
          if (currentIndex !== index) {
            newCurrentSubjects.push(currentSubject);
          }

          return newCurrentSubjects;
        },
        [],
      ),
    );
  }, []);

  const handleRemoveClassroom = useCallback((index: number) => {
    setCurrentClassrooms(state =>
      state.reduce(
        (newCurrentClassrooms: string[], currentClassroom, currentIndex) => {
          if (currentIndex !== index) {
            newCurrentClassrooms.push(currentClassroom);
          }

          return newCurrentClassrooms;
        },
        [],
      ),
    );
  }, []);

  const handleSaveSubjects = useCallback(async () => {
    try {
      setLoading(true);

      await api
        .post<SubjectsState>('subjects', {
          subjects: currentSubjects.join(', '),
        })
        .then(response => {
          setSubjects(response.data.subjects);

          addToast({
            type: 'success',
            title: 'Disciplinas salvas com sucesso!',
          });
        });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao salvar as disciplinas',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, currentSubjects, setSubjects]);

  const handleSaveClassrooms = useCallback(async () => {
    try {
      setLoading(true);

      await api
        .post<ClassroomsState>('classrooms', {
          classrooms: currentClassrooms.join(', '),
        })
        .then(response => {
          setClassrooms(response.data.classrooms);

          addToast({
            type: 'success',
            title: 'Turmas salvas com sucesso!',
          });
        });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao salvar as turmas',
      });
    } finally {
      setLoading(false);
    }
  }, [addToast, currentClassrooms, setClassrooms]);

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Header isHome />

      <Container>
        <Content>
          <strong>Disciplinas</strong>

          <h2>Adicionar disciplina</h2>

          <div>
            <form>
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  value={newSubject}
                  onChange={e => setNewSubject(e.target.value)}
                />

                <button type="button" onClick={handleAddNewSubject}>
                  <FiPlus />
                </button>
              </div>
            </form>
          </div>

          <section>
            {currentSubjects.map((subject, index) => (
              <ItemContainer key={subject}>
                <strong>{subject}</strong>

                <button
                  type="button"
                  onClick={() => handleRemoveSubject(index)}
                >
                  <FiTrash />
                </button>
              </ItemContainer>
            ))}
          </section>

          <Button type="button" onClick={handleSaveSubjects}>
            Salvar
          </Button>
        </Content>

        <Content>
          <strong>Turmas</strong>

          <h2>Adicionar turma</h2>

          <div>
            <form>
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  value={newClassroom}
                  onChange={e => setNewClassroom(e.target.value)}
                />

                <button type="button" onClick={handleAddNewClassroom}>
                  <FiPlus />
                </button>
              </div>
            </form>
          </div>

          <section>
            {currentClassrooms.map((classroom, index) => (
              <ItemContainer key={classroom}>
                <strong>{classroom}</strong>

                <button
                  type="button"
                  onClick={() => handleRemoveClassroom(index)}
                >
                  <FiTrash />
                </button>
              </ItemContainer>
            ))}
          </section>

          <Button type="button" onClick={handleSaveClassrooms}>
            Salvar
          </Button>
        </Content>

        {/* <Content>
          <strong>Mapa de laboratórios</strong>

          <h2>Alterar laboratório</h2>

          <div>
            <form>
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  value={newClassroom}
                  onChange={e => setNewClassroom(e.target.value)}
                />

                <button type="button" onClick={handleAddNewClassroom}>
                  <FiPlus />
                </button>
              </div>
            </form>
          </div>

          <main>
            <Laboratories
              selectedLaboratory={selectedLaboratory}
              setSelectedLaboratory={setSelectedLaboratory}
            />
          </main>

          <Button type="button" onClick={handleSaveClassrooms}>
            Salvar
          </Button>
        </Content> */}
      </Container>
    </>
  );
};

export default Configurations;
