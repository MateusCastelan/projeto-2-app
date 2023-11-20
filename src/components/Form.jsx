import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';

import styles from '../styles/Form.module.css'

export const Form = ({ action, formTitle, formFields, buttonLabel, initialValues }) => {
  // const [formValues, setFormValues] = useState(initialValues || {});

  // useEffect(() => {
  //   // Preencher os valores iniciais quando a prop initialValues mudar
  //   setFormValues(initialValues || {});
  // }, [initialValues]);

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     [name]: type === 'checkbox' ? checked : value,
  //   }));
  // };

  const getMainContainerClassName = (formTitle) => {
    if (formTitle === 'Cadastro de Artigos' || formTitle === 'Atualizar Artigo: [id]') {
      return styles.mainCtnArticle;
    } else {
      return styles.mainContainer;
    }
  }

  const getContainerClassName = (formTitle) => {
    if (formTitle === 'Cadastro de Artigos' || formTitle ==='Atualizar Artigo: [id]') {
      return styles.cntArticle;
    } else {
      return styles.container;
    }
  }

  const getSectionClassName = (field) => {
    if (field.type === 'checkbox') {
      return styles.check;
    } else if (field.type === 'textarea') {
      return styles.contentText;
    } else if (field.type === 'file') {
      return styles.file;
    } else {
      return styles.inputBox;
    }
  };

  const getLabelClassName = (field, formTitle) => {
    if (field.type === 'email' && formTitle !== 'Cadastro de Usuário') {
      return styles.emailInput;
    } else {
      return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <section 
      className={getMainContainerClassName(formTitle)}
    >
      <article className={getContainerClassName(formTitle)}>
        <form
          action={action}
          method='post'
          encType='multipart/form-data'
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <h1 className={styles.title}>{formTitle}</h1>
          {formFields.map((field) => (
            <section
              key={field.id}
              className={getSectionClassName(field)}
            >
              {field.type !== 'checkbox' && field.type !== 'file' && field.type !== 'textarea' && (
                <>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    defaultValue={field.defaultValue}
                    // value={formValues[field.name] || ''}
                    required={field.required}
                    readOnly={field.readOnly}
                    // onChange={handleChange}
                  />
                  <label 
                    htmlFor={field.name} 
                    className={getLabelClassName(field, formTitle)}
                  >
                    {field.label}
                  </label>
                </>
              )}
              {field.type === 'checkbox' && (
                <>
                  <label htmlFor={field.name}>{field.label}</label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    defaultValue={field.defaultValue}
                    // checked={formValues[field.name] || false}
                    // onChange={handleChange}
                  />
                </>
              )}
              {field.type === 'file' && (
                <>
                  <label htmlFor={field.name}>{field.label}</label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    accept="image/*"
                    // onChange={handleChange}
                  />
                </>
              )}
              {field.type === 'textarea' && (
                <>
                  <label htmlFor={field.name}>{field.label}</label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    defaultValue={field.defaultValue}
                    // value={formValues[field.name] || ''}
                    required={field.required}
                    // onChange={handleChange}
                  />
                </>
              )}
            </section>
          ))}
          <button
            type="submit"
            className={styles.btn}
          >
            {buttonLabel}
          </button>
        </form>
      </article>
    </section>
  );
};
