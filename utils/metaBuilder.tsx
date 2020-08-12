import { ReactElement } from "react";
import { Post } from "../lib/collection/Post";

const defaultMetaProps = {
  title: "UE Cardenal Gonzalez Zumarraga",
  description: "Bienvenidos a la página oficial de la Unidad Educativa Cardenal Gonzalez Zumarraga. Exelencia académica siempre. Aqui recibiran informacion referente a nuestra institución.",
  image: "/assets/vista-frontal-edificio-patio-principal-min.jpg"
};

export type MetaPagesProps = { domain: string; };
export const MetaPages = (props: MetaPagesProps): ReactElement => {
  return <>
    <meta name="title" content={`${defaultMetaProps.title}`} />
    <meta name="description" content={`${defaultMetaProps.description}`} />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={`https://${props.domain}`} />
    <meta property="og:title" content={`${defaultMetaProps.title}`} />
    <meta property="og:description" content={`${defaultMetaProps.description}`} />
    <meta property="og:image" content={`https://${props.domain}${defaultMetaProps.image}`} />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={`https://${props.domain}`} />
    <meta property="twitter:title" content={`${defaultMetaProps.title}`} />
    <meta property="twitter:description" content={`${defaultMetaProps.description}`} />
    <meta property="twitter:image" content={`https://${props.domain}${defaultMetaProps.image}`} />
  </>;
}

export type MetaPostProps = { domain: string; post: Post };
export const MetaPosts = (props: MetaPostProps): ReactElement => {
  let keywords: string = "";
  if (props.post.tags) {
    for (let i = 0; props.post.tags?.length > i; i++) {
      keywords = keywords + `${props.post.tags[i].name},`;
    }
  }

  return <>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="HandheldFriendly" content="True" />
    <meta name="description" content={`${props.post.meta_description}`} />
    <link rel="canonical" href={`https://${props.domain}/${props.post.slug}`} />
    <meta name="referrer" content="no-referrer-when-downgrade" />

    <meta property="og:site_name" content="Unidad Educativa Cardenal Gonzalez Zumarraga" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={`${props.post.og_title || props.post.title}`} />
    <meta property="og:description" content={`${props.post.og_description || props.post.excerpt}`} />
    <meta property="og:url" content={`https://www.${props.domain}/${props.post.slug}`} />
    <meta property="og:image" content={`${props.post.og_image}`} />
    <meta property="article:published_time" content={`${props.post.published_at}`} />
    <meta property="article:modified_time" content={`${props.post.updated_at}`} />
    <meta property="article:tag" content={`${keywords}`} />

    <meta property="article:publisher" content="https://www.facebook.com/gonzuofficial" />
    <meta property="article:author" content="https://www.facebook.com/gonzuofficial" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={`${props.post.twitter_title || props.post.title}`} />
    <meta name="twitter:description" content={`${props.post.twitter_description || props.post.excerpt}`} />
    <meta name="twitter:url" content={`https://www.${props.domain}/${props.post.slug}`} />
    <meta name="twitter:image" content={`${props.post.twitter_image || props.post.feature_image}`} />
    <meta name="twitter:label1" content="Redactado por" />
    <meta name="twitter:data1" content={`${props.post.primary_author?.name}`} />
    <meta name="twitter:creator" content={`${props.post.primary_author?.slug}`} />
    <script key={`PostJSON-${props.post.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "publisher": {
            "@type": "Organization",
            "name": "Unidad Educativa Cardenal Gonzalez Zumarraga",
            "url": `https://www.${props.domain}`,
            "logo": {
              "@type": "ImageObject",
              "url": `https://www.${props.domain}/favicon-32x32.png`
            }
          },
          "author": {
            "@type": "Person",
            "name": `${props.post.primary_author?.name}`,
            "image": {
              "@type": "ImageObject",
              "url": `${props.post.primary_author?.cover_image}`
            },
            "url": `https://www.${props.domain}/autor/${props.post.primary_author?.slug}`,
            "sameAs": [
              `https://www.${props.domain}`,
              "https://www.facebook.com/gonzuoficial"
            ]
          },
          "headline": `${props.post.title}`,
          "url": `https://www.${props.domain}/${props.post.slug}`,
          "datePublished": `${props.post.published_at}`,
          "dateModified": `${props.post.updated_at}`,
          "image": {
            "@type": "ImageObject",
            "url": `${props.post.feature_image}`
          },
          "keywords": keywords,
          "description": `${props.post.custom_excerpt}`,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.${props.domain}`
          }
        }
      )
    }} />
  </>;
}