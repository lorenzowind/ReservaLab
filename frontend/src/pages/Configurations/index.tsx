import React, { useCallback, useEffect, useState } from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useSubjects, SubjectsState } from '../../hooks/subjects';

import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

import { Container, Content, SubjectContainer } from './styles';

const Configurations: React.FC = () => {
  const { addToast } = useToast();
  const { subjects, setSubjects } = useSubjects();

  const [loading, setLoading] = useState(false);

  const [newSubject, setNewSubject] = useState('');
  const [currentSubjects, setCurrentSubjects] = useState(subjects);

  useEffect(() => {
    setCurrentSubjects(subjects);
  }, [subjects]);

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
              <SubjectContainer key={subject}>
                <strong>{subject}</strong>

                <button
                  type="button"
                  onClick={() => handleRemoveSubject(index)}
                >
                  <FiTrash />
                </button>
              </SubjectContainer>
            ))}
          </section>

          <Button type="button" onClick={handleSaveSubjects}>
            Salvar
          </Button>
        </Content>
      </Container>
    </>
  );
};

export default Configurations;
