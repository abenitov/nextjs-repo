const ProductComponentSSR = ({ data }) => {
    return (
        <div>
            <h2>Server-Side Rendering</h2>
            <p>Full Name: {data.full_name}</p>
            <p>Description: {data.description}</p>
            <p>Stars: {data.stargazers_count}</p>
        </div>
    );
};

export default ProductComponentSSR;
