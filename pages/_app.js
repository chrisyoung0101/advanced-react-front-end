import NProgress from 'nprogress';
// we need router to hook into a couple events from nprogress
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';
import withData from '../lib/withData';

// I AM THE HIGHEST LEVEL COMPONENT

// comes from nprogress - use this for initial set up before custom styling
// import 'nprogress/nprogress.css';
// this is our custom style
import '../components/styles/nprogress.css';

// when routeChangeStart starts, animate the start
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// this is more next.js stuff
// here we are wrapping all pages in this MyApp component aka __app
// often need to restart project when adding such a change for it to start working

function MyApp({ Component, pageProps, apollo }) {
  console.log(apollo);
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

// Tell next.js go fetch all the queries that are in the children components
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
