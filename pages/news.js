import axios from 'axios';
import styles from '../styles/styles.module.css';
import Link from 'next/link';

function News({ articles }) {
    const filteredArticles = articles.filter(article => article.content !== '[removed]');

    return (
        <div className="container">
            <h1 className={`${styles.latestNews}`}>News</h1>
            <div className="row">
                {filteredArticles.map(article => (
                    <div key={article.title} className="col-md-6 mb-4">
                        <Link href={`/article/${encodeURIComponent(article.source.id)}`}>

                            <div className={`card ${styles.hoverEffect} h-100 d-flex flex-column`}>
                                {article.urlToImage && (
                                    <img src={article.urlToImage} className="card-img-top" alt={article.title} />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{article.title}</h5>
                                    <p className="card-text">{article.description}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const apiKey = '1dc16ec5b23648aa968caf240b21f3b7';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const articles = response.data.articles.map((article, index) => ({
            ...article,
            id: index + 1,
        }));
        return { props: { articles } };
    } catch (error) {
        console.error('Error when fetching', error);
        return { props: { articles: [] } };
    }
}

export default News;
