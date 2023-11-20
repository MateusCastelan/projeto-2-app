import React from 'react'
import styles from '../styles/LoginForm.module.css'
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';


export const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        username,
        password,
      },
        {
          withCredentials: true,
        });

      if (response.status === 200) {
        router.push('/editUser');
      } else {
        console.error('Credenciais inválidas', response.data);
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err.message);
    }
  };

  return (
    <article className={styles.container}>
      <form action="/login" method="post" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <section className={styles.inputBox}>
          <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} required />
          <label>Usuário</label>
          <i className='bx bxs-user'></i>
        </section>
        <section className={styles.inputBox}>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
          <label>Senha</label>
          <i className='bx bxs-lock-alt'></i>
        </section>
        <section className={styles.rememberCheck}>
          <label htmlFor="remember">
            <input type="checkbox" id="remember" />
            Lembrar credenciais
          </label>
          <a href="#">Esqueceu a senha?</a>
        </section>
        <button type="submit" className={styles.btn}>Entrar</button>
        <section className={styles.registerLink}>
          <p>
            Não tem uma conta?
            <a href="#">Cadastrar</a>
          </p>
        </section>
      </form>
    </article>
  );
};