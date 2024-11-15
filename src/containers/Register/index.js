import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import Logo from '../../assets/logo.svg'
import RegisterImage from '../../assets/registerImage.svg'
import { Button, ErrorMessage } from '../../components'
import api from '../../services/api'
import * as C from './styles'

export function Register() {
  const schema = Yup.object().shape({
    name: Yup.string().required('O seu nome é obrigatorio'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatorio'),
    password: Yup.string()
      .required('A senha é obrigatoria')
      .min(6, 'a senha deve ter pelo menos 6 digitos'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas tem q ser iguais')
      .required('A senha é obrigatoria')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
     
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async clientData => {
    try {
      const { status } = await api.post(
        'users',
        {
          name: clientData.name,
          email: clientData.email,
          password: clientData.password
        },
        { validateStatus: () => true }
      )

      if (status === 201 || status === 201) {
        toast.success('cadastro criado com sucesso')
      } else if (status === 409) {
        toast.error('Email ja cadastrado')
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error('Falha no sistema! tente novamente')
    }
  }

  return (
    <C.Container>
      <C.RegisterImage src={RegisterImage} alt="register-image" />
      <C.ContainerItens>
        <img src={Logo} />
        <h1>Cadastre-se</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <C.Label error={errors.name?.message}>Nome</C.Label>
          <C.Input
            type="text"
            {...register('name')}
            error={errors.name?.message}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
          <C.Label error={errors.email?.message}>Email</C.Label>
          <C.Input
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <C.Label error={errors.password?.message}>Senha</C.Label>
          <C.Input
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <C.Label error={errors.confirmPassword?.message}>
            Confirmar Senha
          </C.Label>
          <C.Input
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 25, marginBottom: 25 }}>
            Sign Up
          </Button>
        </form>
        <C.SignInLink>
          Ja possui conta?{' '}
          <Link style={{ color: 'white' }} to="/login">
            sign Ip
          </Link>
        </C.SignInLink>
      </C.ContainerItens>
    </C.Container>
  )
}