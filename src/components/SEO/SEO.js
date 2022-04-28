import Head from 'next/head';
import { useTranslations } from 'next-intl';

const SEO = ({ title, description, keywords }) => {
    const t = useTranslations('config');
    const metaDescription = description || t('description');
    const defaultTitle = title || t('title');
    const defaultKeywords = keywords || t('keywords');

    return (
        <Head>
            <title>{`${title} | Meet-up`}</title>
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <meta name='robots' content='follow, index' />
            <meta content={metaDescription} name='description' />
            <meta name='keywords' content={defaultKeywords} />
            <meta property='og:type' content='website' />
            <meta property='og:title' content={defaultTitle} />
            <meta property='og:description' content={metaDescription} />
            <meta property='og:site_name' content={defaultTitle} />
            <meta property='twitter:card' content='summary' />
            <meta property='twitter:creator' content={t('social.twitter')} />
            <meta property='twitter:title' content={defaultTitle} />
            <meta property='twitter:description' content={metaDescription} />
            <meta httpEquiv='Content-Security-Policy' content='upgrade-insecure-requests' />
        </Head>
    );
};

export default SEO;
