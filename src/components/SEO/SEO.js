import Head from "next/head"
import config from "../../config"

const SEO = ({ title, description, keywords }) => {
  const metaDescription = description || config.description
  const defaultTitle = config.title

  return (
    <Head>
      <meta charset="utf-8"/>
      <title>{`${title} | ${defaultTitle}`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="robots" content="nofollow, noindex" />
      <meta content={metaDescription} name="description" />
      <meta name="keywords" content={keywords} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={config.social.twitter} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={metaDescription} />
    </Head>
  )
}

export default SEO
