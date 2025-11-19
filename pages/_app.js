import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>GradeGenius - AI-Powered Grading Platform</title>
        <meta name="description" content="Transform your grading workflow with AI-powered intelligent rubric generation and automated feedback assistance." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
