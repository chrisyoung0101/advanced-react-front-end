import Page from '../components/Page';

// this is more next.js stuff
// here we are wrapping all pages in this MyApp component
// often need to restart project when adding such a change for it to start working

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
