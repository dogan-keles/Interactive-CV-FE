import { Helmet } from 'react-helmet-async';

function SEO({
    title,
    description,
    keywords,
    image = "https://dogankeles.com/og-image.png",
    url = "https://dogankeles.com",
    type = "website"
}) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            <link rel="canonical" href={url} />
        </Helmet>
    );
}

export default SEO;