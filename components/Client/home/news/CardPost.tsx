import { ReactElement, ReactNode } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { Post } from "../../../../lib/collection/Post";

const dateToText = (dateVal: string) => {
  const months = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
  const date = new Date(dateVal);
  const month = date.getMonth();
  const day = date.getDay();
  const year = date.getFullYear();

  return {
    utc: `${day} de ${months[month]} ${year}`,
    locale: `${year}-${month}-${day}`
  }
}

const CardAuthors = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0px;
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 0 0 0 4px;
    padding: 0;
    list-style: none;
    li {
      position: relative;
      flex-shrink: 0;
      margin: 0;
      padding: 0;
      div{
        border-radius: 100%;
        display: block;
        overflow: hidden;
        margin: 0 -4px;
        width: 40px;
        height: 40px;
        border: #fff 2px solid;
        padding: 0px;
        img {
          display: block;
          object-fit: cover;
          width: 100%;
          height: auto;
        }
      }
    }
  }
  section {
    margin: 2px 4px;
    color: var(--midgrey);
    font-size: 0.7rem;
    line-height: 1.2em;
    letter-spacing: 0.2px;
    text-transform: uppercase;
    text-decoration: none;
    h4 {
      margin: 0px 3px;
      font-size: 0.8rem;
      line-height: 1.4em;
      font-weight: 800;
      color: #15171a;
      p {
        margin: 0;
      }
    }
    div {
      margin: 2px 3px;
      color: #738a94;
      font-size: 0.7rem;
      line-height: 1.2em;
      letter-spacing: 0.2px;
      text-transform: uppercase;
      text-decoration: none;
    }
  }

`;

const CardBody = styled.div`
  padding: 5px 0px;
  font-size: 1.2rem;
  height: 85px;
  overflow-y: hidden;
`;

const CardImage = styled.div`
  width: 100%;
  border-radius: 5px;

  img {
    display:block;
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const CardTag = styled.div`
  font-size: .9rem;
  font-weight: 700;
`;

const CardTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
`;

const CardPosts = styled.div`
  max-width: 300px;
  padding: 20px 10px;
  -webkit-text-size-adjust: 100%;
  margin: 0 auto;
  color: black;
  @media (max-width: 450px){
    max-width: none;
    padding: 30px 0px;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1.3fr;
    border-bottom: 1px solid #e9eff3;
    ${CardImage} {
      grid-column: 1;
      grid-row: 1 / span 2;
      align-self: center;
    }
    ${CardTag} {
      display:none;
    }
    ${CardTitle} {
      grid-column: 2;
      grid-row: 1;
    }
    ${CardBody} {
      grid-column: 2;
      grid-row: 2;
    }
    ${CardAuthors} {
      display:none;
    }
  }
`;

const listedAuthors = (authors: any[]): string => {
  let authorsNames: string = "";
  const sliceFirstWord = (words: string) => {
    const hasSpaces = words.indexOf(" ");
    if (hasSpaces === -1) return words;
    return words.substr(0, hasSpaces);
  }

  for (let i = 0; authors?.length > i; i++) {
    if (i > 0) {
      authorsNames = authorsNames + `, ${sliceFirstWord(authors[i].name)}`;
    } else {
      authorsNames = `${sliceFirstWord(authors[i].name)}`;
    }
  }
  return authorsNames;
}

export default (props: { post: Post; children?: ReactNode }): ReactElement => {
  const post = props.post;
  if (post) {
    const date = dateToText(post.published_at)
    const authorsNames = listedAuthors(post.authors || []);
    return <Link href="/[slug]" as={`/${post.slug}`}>
      <a style={{ textDecoration: "none", padding: "none" }}>
        <CardPosts>
          <CardImage>
            <img loading="lazy" src={props.post.feature_image} alt={`${props.post.slug}`} />
          </CardImage>
          {!!post.tags?.length && (
            <CardTag>{post.tags[0]?.name}</CardTag>
          )}
          <CardTitle>{post.title}</CardTitle>
          <CardBody>
            {post.excerpt}
          </CardBody>
          <CardAuthors>
            <ul>
              {
                post.authors && post.authors.map((author, key) => (
                  <li key={key}>
                    <div>
                      <img loading="lazy" src={`${author.profile_image}`} alt={`${author.name}`} />
                    </div>
                  </li>
                ))
              }
            </ul>
            <section>
              <h4>
                <p>{authorsNames}</p>
              </h4>
              <div>
                <time dateTime={`${date.locale}`}>{`${date.utc}`}</time>
              </div>
            </section>
          </CardAuthors>
        </CardPosts>
      </a>
    </Link>
  }

  return <></>;
}