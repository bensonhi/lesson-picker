import '../src/index.css';
import Head from 'next/head'
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

function MyApp({ Component, pageProps }) {
  return <div>
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="google-site-verification" content="nDiVKSMJ4-eQU0pmLEjCI0VsMpd2H0w6KpATRQMP_-U" />
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      <script src="https://kit.fontawesome.com/b8e8e83d36.js" crossOrigin="anonymous"></script>
      <title>北科大選課規劃工具 Lesson Picker for NTUT</title>
    </Head>


  <Component {...pageProps} />


  </div>
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp