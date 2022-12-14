import Head from "next/head";
import GoBack from "../components/goBack";

export default function About() {
  return (
    <div>
      <Head>
        <title>zkSalt - About</title>
        <meta name="title" content="zkSalt - About" />
        <meta name="description" content="ZK Salt - About" />
      </Head>
      <div className="mb-10">
        <GoBack />
      </div>
      <div className="grid place-items-center">
        <div className="flex justify-center items-center mb-10 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">
          zkSalt
        </div>
        <div className="flex justify-center items-center text-lg md:w-96 w-auto text-slate-300">
          zkSalt is a platform that allows users to verify qualities without revealing details on chain. (zero knowledge)
        </div>
      </div>
    </div>
  );
}
