import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>eetch.me – AI Romantic Challenges</title>
        <meta name="description" content="AI-powered romantic and sexual challenges for couples and groups." />
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
        <h1 className="text-4xl font-bold mb-4">Welcome to eetch.me</h1>
        <p className="mb-8 text-lg text-center max-w-xl">
          AI-powered, private romantic and sexual challenges for couples and groups—delivered via Telegram.
        </p>
        <Link href="/profile" className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition">Get Started</Link>
      </main>
    </>
  );
}
