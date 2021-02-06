import React, { useCallback, useEffect, useState } from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useSubjects, SubjectsState } from '../../hooks/subjects';
import { useClassrooms, ClassroomsState } from '../../hooks/classrooms';
import { useSchedules, SchedulesState } from '../../hooks/schedules';

import Laboratories, { Laboratory } from '../../components/Laboratories';
import Appointments from '../../components/Appointments';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

import ModalLaboratory from '../../components/Modal/ModalLaboratory';
import ModalCreateSchedule from '../../components/Modal/ModalCreateSchedule';

import { Container, Content, ItemContainer } from './styles';

type ContextType = 'lbrt' | 'scdl' | 'sbjc' | 'clrm' | '';

const Configurations: React.FC = () => {
  const location = useLocation();

  const { addToast } = useToast();
  const { subjects, setSubjects } = useSubjects();
  const { classrooms, setClassrooms } = useClassrooms();
  const { schedules, setSchedules } = useSchedules();

  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState<ContextType>('');
  const [modalLaboratoryOpen, setModalLaboratoryOpen] = useState(false);
  const [modalScheduleOpen, setModalScheduleOpen] = useState(false);

  const [newSubject, setNewSubject] = useState('');
  const [currentSubjects, setCurrentSubjects] = useState(subjects);

  const [newClassroom, setNewClassroom] = useState('');
  const [currentClassrooms, setCurrentClassrooms] = useState(classrooms);

  const [selectedLaboratory, setSelectedLaboratory] = useState<Laboratory>(
    {} as Laboratory,
  );

  useEffect(() => {
    const auxContext = location.search.replace('?ctx=', '');

    switch (auxContext) {
      case 'lbrt':
      case 'scdl':
      case 'sbjc':
      case 'clrm': {
        setContext(auxContext);
        break;
      }
      default: {
        setContext('');
        break;
      }
    }
  }, [location.search]);

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
          setSubjects(response.data);

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
          setClassrooms(response.data);

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

  const handleRemoveSchedule = useCallback(
    async (index: number) => {
      try {
        setLoading(true);

        const data: SchedulesState[] = schedules.reduce(
          (
            newSchedules: SchedulesState[],
            schedule: SchedulesState,
            currentIndex,
          ) => {
            if (currentIndex !== index) {
              newSchedules.push({
                schedule_name: schedule.schedule_name,
                schedule_begin: schedule.schedule_begin,
                schedule_end: schedule.schedule_end,
              });
            }

            return newSchedules;
          },
          [],
        );

        await api
          .post<SchedulesState[]>('schedules', {
            data,
          })
          .then(response => {
            setSchedules(response.data);

            addToast({
              type: 'success',
              title: 'Horário removido com sucesso!',
            });
          });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao remover o horário',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, schedules, setSchedules],
  );

  function toggleModalLaboratory(): void {
    if (modalLaboratoryOpen) {
      setSelectedLaboratory({} as Laboratory);
    }

    setModalLaboratoryOpen(!modalLaboratoryOpen);
  }

  function toggleModalSchedule(): void {
    setModalScheduleOpen(!modalScheduleOpen);
  }

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <ModalLaboratory
        isOpen={modalLaboratoryOpen}
        laboratory={selectedLaboratory}
        setIsOpen={toggleModalLaboratory}
      />

      <ModalCreateSchedule
        isOpen={modalScheduleOpen}
        setIsOpen={toggleModalSchedule}
      />
      <Header isHome={false} />

      <Container>
        {context === 'lbrt' && (
          <Content>
            <main>
              <Laboratories
                operationContext="update"
                selectedLaboratory={selectedLaboratory}
                setSelectedLaboratory={setSelectedLaboratory}
                toggleModalLaboratory={toggleModalLaboratory}
              />
            </main>
          </Content>
        )}

        {context === 'scdl' && (
          <Content>
            <strong>Horários</strong>

            <Appointments
              operationContext="update"
              handleRemoveSchedule={handleRemoveSchedule}
              toggleModalSchedule={toggleModalSchedule}
            />
          </Content>
        )}

        {context === 'sbjc' && (
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
        )}

        {context === 'clrm' && (
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
        )}
      </Container>
    </>
  );
};

export default Configurations;
