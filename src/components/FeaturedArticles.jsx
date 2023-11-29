import React from 'react'
import styles from '../styles/ArticleHome.module.css';
import Link from 'next/link';

export const FeaturedArticles = ({ articles }) => {
  return (
    <section className={styles.container}>
      <article className={styles.subTitle}>
        <h2>Publicações em Destaque</h2>
      </article>
      <section className={styles.groupContainer}>
        {articles.map((article) => (
          article.kb_featured && (
            <Link key={article.kb_id} href={`/article/${article.kb_id}`}>
              <section className={styles.newsContainer}>
                <section className={styles.imgContainer}>
                  <img src={article.kb_image} alt="Imagem do Artigo" />
                </section>
                <article className={styles.infoContainer}>
                  <h3>{article.kb_title}</h3>
                  <p>{article.kb_summary}</p>
                </article>
              </section>
            </Link>
          )
        ))}
      </section>
    </section>
  );
}
