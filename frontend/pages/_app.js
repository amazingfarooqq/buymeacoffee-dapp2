import { Web3ReactProvider } from '@web3-react/core'
import { ContextAPIProvider, useContextAPI } from '../lib/contextapi'
import '../styles/globals.css'

import { Web3Provider } from '@ethersproject/providers';

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

import "bootstrap/dist/css/bootstrap.css"
import { Router } from 'next/router';

import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ContextAPIProvider >
        <Component {...pageProps} />
      </ContextAPIProvider>
    </Web3ReactProvider>
    </>

  )
}

export default MyApp
