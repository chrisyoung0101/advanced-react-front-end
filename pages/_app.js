import NProgress from 'nprogress';
// we need router to hook into a couple events from nprogress
import Router from 'next/router';
import Page from '../components/Page';

// I AM THE HIGHEST LEVEL COMPONENT

// comes from nprogress - use this for initial set up before custom styling
// import 'nprogress/nprogress.css';
import '../components/styles/nprogress.css';

// when routeChangeStart starts, animate the start
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// this is more next.js stuff
// here we are wrapping all pages in this MyApp component aka __app
// often need to restart project when adding such a change for it to start working

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
