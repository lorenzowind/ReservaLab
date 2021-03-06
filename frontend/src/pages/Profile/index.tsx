import React, { useRef, useState, useCallback, ChangeEvent } from 'react';
import {
  FiArrowLeft,
  FiBook,
  FiCamera,
  FiLock,
  FiMail,
  FiUser,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';
import getSubjectsArray from '../../utils/getSubjectsArray';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import MultiSelect, { Option } from '../../components/MultiSelect';
import Loading from '../../components/Loading';

import {
  Container,
  BackSection,
  InputsSection,
  UserImage,
  Content,
  ButtonsContainer,
} from './styles';

interface ProfileFormData {
  name: string;
  ra: string;
  email: string;
  subjects: string;
  password: string;
  new_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const [subjectsSelect] = useState<Option[]>(() => {
    return getSubjectsArray().map(subject => {
      return {
        label: subject,
        value: subject,
      };
    });
  });
  const [selectedSubjects, setSelectedSubjects] = useState<Option[]>(() => {
    if (user.subjects) {
      return user.subjects.split(', ').map(subject => {
        return {
          label: subject,
          value: subject,
        };
      });
    }

    return [];
  });
  const [status, setStatus] = useState<'data' | 'password' | ''>('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        if (status === 'data') {
          const schema1 = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            ra: Yup.string().required('RA obrigatório'),
            email: Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail válido'),
          });

          await schema1.validate(data, {
            abortEarly: false,
          });

          if (!selectedSubjects.length) {
            throw new Error();
          }
        } else if (status === 'password') {
          if (
            data.password ||
            data.new_password ||
            data.password_confirmation
          ) {
            const schema2 = Yup.object().shape({
              password: Yup.string().min(6, 'Senha obrigatória'),
              new_password: Yup.string().min(6, 'Senha obrigatória'),
              password_confirmation: Yup.string().oneOf(
                [Yup.ref('new_password'), undefined],
                'Confirmação incorreta',
              ),
            });

            await schema2.validate(data, {
              abortEarly: false,
            });
          }
        }

        const userData = {
          name: data.name ? data.name : user.name,
          ra: data.ra ? data.ra : user.ra,
          email: data.email ? data.email : user.email,
          position: user.position,
          subjects: selectedSubjects
            .map(selectedSubject => selectedSubject.value)
            .join(', '),
          old_password: data.password || '',
          new_password: data.new_password || '',
        };

        setLoading(true);

        await api.put('users', userData).then(response => {
          updateUser(response.data);
        });

        addToast({
          type: 'success',
          title: 'Perfil atualizado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao atualizar perfil',
          description: 'Ocorreu um erro, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, selectedSubjects, status, updateUser, user],
  );

  const handleSubmitAvatar = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        if (e.target.files) {
          const data = new FormData();

          data.append('avatar', e.target.files[0]);

          setLoading(true);

          await api.patch('users/avatar', data).then(response => {
            updateUser(response.data);

            addToast({
              type: 'success',
              title: 'Avatar atualizado!',
            });
          });
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar avatar',
          description: 'Ocorreu um erro, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, updateUser],
  );

  return (
    <>
      {loading && <Loading zIndex={1} />}

      <Header isHome={false} />

      <Container>
        <Content>
          <BackSection
            onClick={() => {
              if (status !== '') {
                setStatus('');
              } else {
                history.goBack();
              }
            }}
          >
            <FiArrowLeft />
            <strong>Voltar</strong>
          </BackSection>

          <UserImage>
            <>
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="User" />
              ) : (
                <FiUser />
              )}
              <label htmlFor="avatar">
                <FiCamera />

                <input type="file" id="avatar" onChange={handleSubmitAvatar} />
              </label>
            </>
          </UserImage>

          <Form ref={formRef} onSubmit={handleSubmit}>
            {status === 'data' && (
              <>
                <section>
                  <InputsSection>
                    <strong>Nome completo</strong>
                    <Input name="name" defaultValue={user.name} icon={FiUser} />

                    <strong>RA</strong>
                    <Input name="ra" defaultValue={user.ra} icon={FiUser} />
                  </InputsSection>

                  <InputsSection>
                    <strong>Email</strong>
                    <Input
                      name="email"
                      defaultValue={user.email}
                      icon={FiMail}
                    />

                    <strong>Disciplinas</strong>
                    <MultiSelect
                      isDisabled={user.position === 'admin'}
                      options={subjectsSelect}
                      placeholder="Selecione"
                      selectedOptions={selectedSubjects}
                      setSelectedOptions={setSelectedSubjects}
                      defaultValues={selectedSubjects}
                      icon={FiBook}
                    />
                  </InputsSection>
                </section>

                <ButtonsContainer>
                  <Button type="submit">Salvar</Button>
                </ButtonsContainer>
              </>
            )}

            {status === 'password' && (
              <>
                <section>
                  <InputsSection>
                    <strong>Senha atual</strong>
                    <Input name="password" type="password" icon={FiLock} />

                    <strong>Nova senha</strong>
                    <Input name="new_password" type="password" icon={FiLock} />

                    <strong>Confirmar senha</strong>
                    <Input
                      name="password_confirmation"
                      type="password"
                      icon={FiLock}
                    />
                  </InputsSection>
                </section>

                <ButtonsContainer>
                  <Button type="submit">Salvar</Button>
                </ButtonsContainer>
              </>
            )}

            {status === '' && (
              <ButtonsContainer>
                <Button
                  color="#59617D"
                  type="button"
                  onClick={() => setStatus('data')}
                >
                  Dados pessoais
                </Button>
                <Button
                  color="#59617D"
                  type="button"
                  onClick={() => setStatus('password')}
                >
                  Senha
                </Button>
              </ButtonsContainer>
            )}
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Profile;
