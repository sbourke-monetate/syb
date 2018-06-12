import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import config from '../../data/SiteConfig'
import TopNavigation from '../components/Layout/Navigation/Navigation'
import PostListing from '../components/Posts/PostListing/PostListing'


export default class PostTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext
    const postNode = this.props.data.wordpressPost
    const postEdges = this.props.data.allWordpressPost.edges
    if (!postNode.id) {
      postNode.id = slug
    }
    if (!postNode.category_id) {
      postNode.category_id = config.postDefaultCategoryID
    }
    return (
      <div>
        <Helmet>
          <title>{`${postNode.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <TopNavigation pages={this.props.data.allWordpressPage} />
        <div className="postContainer">
          <div className="postContent">
            <div className="featuredImage">
               <img
                    className="featured-image"
                    src={postNode.featured_media.source_url}
                    alt=""
                  />
            </div>
            <div className="postInfo">
              <h1>{postNode.title} </h1>
              <div dangerouslySetInnerHTML={{ __html: postNode.content }} />
            </div>
          </div>
            <div className="portfolio-container">

              <div className="additional">       
                  <PostListing postEdges={postEdges} cat={`featured`} />
                  <PostListing postEdges={postEdges} cat={`dodec`} arrows={true}/>                
                  <PostListing postEdges={postEdges} cat={`personal`} arrows={true} />                
              </div>

          </div>
        </div>  
        <div className="footer">
          <p>sybfrontend.com - a portfolio site made with React / Gatsby </p>
        </div>      
      </div>
    )
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query PostById($id: String!) {
    wordpressPost(id: { eq: $id }) {
      featured_media {
        source_url
      }
      date
      slug
      title
      modified
      excerpt
      id
      categories {
        name
      }
      content
    }
    allWordpressPost {
      edges {
        node {
          featured_media {
            source_url
          }
          date
          slug
          title
          modified
          excerpt
          id
          acf {
            extrathumb {
              source_url
              localFile {
                childImageSharp {
                  sizes(maxWidth: 1050, quality: 100) {
                    ...GatsbyImageSharpSizes_noBase64                 
                  }
                }
              }
            }
          }
          categories {
            name
          }
          tags {
            name
          }
          content
        }
      }
    }
    allWordpressPage {
      edges {
        node {
          slug
          title
          id
        }
      }
    }
  }
`