import Head from 'next/head';
import ProductComponentCSR from '../components/ProductComponentCSR';
import ProductComponentSSR from '../components/ProductComponentSSR';

export const runtime = 'edge';

console.log("propertiesInit")
async function getData() {
    const response = await fetch('https://api.github.com/repos/vercel/next.js');
    const data = await response.json();

    return {
        data
    };
}

const Home = async () => {
    const data = await getData();
    return (
        <div>
            <Head>
                <title>GitHub Repo Info</title>
            </Head>
            <h1>GitHub Repository Info</h1>
            <ProductComponentCSR />
            <ProductComponentSSR data={data} />
        </div>
    );
};



export default Home;
