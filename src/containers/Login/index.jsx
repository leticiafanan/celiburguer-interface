import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from '../../services/api';
import { toast } from 'react-toastify';

import { Container, Form, InputContainer, LeftContainer, RightContainer, Title } from './styles'
import Logo from '../../assets/Logo.svg'
import { Button } from '../../components/Button'



export function Login() {

  const schema = yup
    .object({
    email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('O e-mail é obrigatório'),
    password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Digite uma senha'),
  }).required();

 
    const { 
      register, 
      handleSubmit, 
      formState:{ errors },
   } = useForm({
      resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        const response =  await toast.promise(
          api.post('/session', {
            email: data.email,
            password: data.password
          }), 
          {
            pending: 'Verificando seus dados',
            success: 'Seja Bem-vindo(a) 👌',
            error: 'Email ou senha incorretos 🤯',
          }
        );
        

        console.log(response);
    };


  return (
    <Container>
      <LeftContainer>
        <img src={Logo}  alt='logo-dev-burguer'/>
      </LeftContainer>        
      <RightContainer>
        <Title>
        Olá, seja bem vindo ao <span>Dev Burguer!</span>
        <br/>
        Acesse com seu <span>Login e senha.</span>
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer >
            <label>Email</label>
            <input type='email' {...register("email")} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type='password' {...register("password")}/>
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <Button type="submit">Entrar</Button>
        </Form>
        <p>
          Não possui conta? <a>Clique aqui.</a>
          </p>
      </RightContainer>               
    </Container>
  )
}
