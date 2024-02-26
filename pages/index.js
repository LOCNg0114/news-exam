import Head from "next/head";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Newspaper</title>
        <meta name="description" content="Newspaper" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <h1>Homepage</h1>
        <p>Watch the latest news:</p>
        <Link href="/news">
          News section
        </Link>
      </div>
    </>
  );
}
