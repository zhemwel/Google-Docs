import Head from "next/head"
import { Provider } from "next-auth/client"
import "tailwindcss/tailwind.css"
import "@material-tailwind/react/tailwind.css"
import "../styles.css"

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"
                />
            </Head>
            <Provider session={pageProps.session}>
                <Component {...pageProps} />
            </Provider>
        </>
    )
}

export default MyApp
