
  import {NextIntlProvider, IntlErrorCode} from 'next-intl';
import { Layout } from '../components/index'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

function onError(error) {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    // Missing translations are expected and should only log an error
    console.error(error);
  } else {
    // Other errors indicate a bug in the app and should be reported
    reportToErrorTracking(error);
  }
}

function getMessageFallback({namespace, key, error}) {
  const path = [namespace, key].filter((part) => part != null).join('.');

  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return `${path} is not yet translated`;
  } else {
    return `Dear developer, please fix this message: ${path}`;
  }
}

  return ( 
    <NextIntlProvider messages={pageProps.messages}  onError={onError} getMessageFallback={getMessageFallback}>
        <Component {...pageProps} />
    </NextIntlProvider>
  )
}

export default MyApp


