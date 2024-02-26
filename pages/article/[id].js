import { useRouter } from 'next/router';
import axios from 'axios';

// export async function getServerSideProps({ params }) {
//     const { sourceId } = params;
//     const apiKey = '1dc16ec5b23648aa968caf240b21f3b7';
//     const apiUrl = `https://newsapi.org/v2/top-headlines?sources=${sourceId}&apiKey=${apiKey}`;

//     try {
//         const response = await axios.get(apiUrl);
//         const article = response.data.articles[0]; // Assuming you only want one article per source
//         return { props: { article } };
//     } catch (error) {
//         console.error('Error fetching article:', error);
//         return { props: { article: null } };
//     }
// }

export default function ArticleDetail({ article }) {
    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h1>{article.title}</h1>
                    <img src={article.urlToImage} className="img-fluid rounded mb-4" alt={article.title} />
                    <p className="lead">{article.description}</p>
                    <p>{article.content}</p>
                    <p>Published at: {article.publishedAt}</p>
                    <p>Source: {article.source.name}</p>
                    <p>Author: {article.author}</p>
                    <p>URL: <a href={article.url} target="_blank" rel="noopener noreferrer">{article.url}</a></p>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const apiKey = '1dc16ec5b23648aa968caf240b21f3b7';; // Replace with your NewsAPI key
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const articles = response.data.articles;

        // Select the first article as the sample article
        const sampleArticle = articles[0];

        return { props: { article: sampleArticle } };
    } catch (error) {
        console.error('Error fetching article:', error);
        return { props: { article: null } };
    }
}
