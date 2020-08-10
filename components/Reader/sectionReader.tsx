import { ReactElement } from "react";
import { Post } from "../../lib/collection/Post";

export default (props: { post: Post }): ReactElement => {
  const sliceFirstWord = (words: string) => {
    const hasSpaces = words.indexOf(" ");
    if (hasSpaces === -1) return words;
    return words.substr(0, hasSpaces);
  }

  return <main id="site-main" className="site-main outer">
    <div className="inner">

      <article className="post-full post tag-getting-started ">

        <header className="post-full-header">

          <section className="post-full-tags">
            {
              props.post.tags && props.post.tags.map(tag => {
                return <a key={tag.slug} href={`/${tag.slug}`}>{tag.name}</a>
              })
            }
          </section>

          <h1 className="post-full-title">{props.post.title}</h1>

          <p className="post-full-custom-excerpt">{props.post.excerpt}</p>

          <div className="post-full-byline">

            <section className="post-full-byline-content">

              <ul className="author-list">
                {
                  props.post.authors && props.post.authors.map((author, key) => (
                    <li key={author.id} className="author-list-item">
                      <a href={`/autor/${author.slug}`} className="author-avatar">
                        <img className="author-profile-image" src={`${author.profile_image}`} alt={`${author.name}`} />
                      </a>
                    </li>
                  ))
                }
              </ul>

              <section className="post-full-byline-meta">
                <h4 className="author-name">
                  {
                    props.post.authors && props.post.authors.map((author, key) => {
                      if (author.name) {
                        if (key > 0) {
                          return (
                            <a key={author.id} href={`/autor/${author.slug}`}>, {sliceFirstWord(author.name)}</a>
                          )
                        }
                        return <a key={author.id} href={`/autor/${author.slug}`}>{sliceFirstWord(author.name)}</a>;
                      }
                      return null;
                    })
                  }

                </h4>
                <div className="byline-meta-content">
                  <time className="byline-meta-date" dateTime="2020-08-09">9 Aug 2020</time>
                </div>
              </section>

            </section>

            <section className="section-reading-time">
              <h3>Lectura {props.post.reading_time}min</h3>
            </section>

          </div>
        </header>

        <figure className="post-full-image">
          <img srcSet={`${props.post.feature_image} 300w,${props.post.feature_image} 600w,${props.post.feature_image} 1000w,${props.post.feature_image} 2000w`}
            sizes="(max-width: 800px) 400px,(max-width: 1170px) 1170px, 2000px" src={props.post.feature_image}
            alt={`${props.post.title}`} />
        </figure>

        <section className="post-full-content">
          <div className="post-content" dangerouslySetInnerHTML={{ __html: props.post.html }} />
        </section>
      </article>
    </div>
  </main>
}