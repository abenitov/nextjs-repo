"use client"
import { useEffect, useState } from 'react';

const ProductComponentCSR = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://api.github.com/repos/vercel/next.js')
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    return (
        <div>
            {data ? (
                <div>
                    <h2>Client-Side Rendering</h2>
                    <p>Full Name: {data.full_name}</p>
                    <p>Description: {data.description}</p>
                    <p>Stars: {data.stargazers_count}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductComponentCSR;
