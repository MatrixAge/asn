import '@/styles/index.less'

import Head from 'next/head'

import { GeistProvider } from '@geist-ui/react'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<GeistProvider>
			<Head>
				<title>ASN EXCEL Generator</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Component {...pageProps} />
		</GeistProvider>
	)
}

export default MyApp
