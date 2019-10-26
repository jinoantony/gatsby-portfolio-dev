import React from 'react'
import { Link, graphql } from 'gatsby'

import { Layout, Container } from 'Common'
import { Header } from 'Theme'

import './style.css'
// import backArrow from '../images/back-arrow.svg'

export default function Template({ data }) {
  const post = data.markdownRemark

  return (
    <Layout>
      <Header/>
      
      <div class="container mb-10" style={{maxWidth: "760px", maxHeight: "200px"}}>
          <div class="h-100 tofront">
            <div class="row">
              <div class="col-md-12 pt-3 pb-10 pr-6">
                <p class="text-uppercase font-weight-bold">
                </p>
                <h1 class="display-10 secondfont mb-3 font-weight-bold">{post.frontmatter.title}</h1>
                <p class="mb-3">
                  {post.frontmatter.subtitle}
                </p>
                <div class="d-flex align-items-center">
                  <h4
                    style={{
                      fontSize: '.8em',
                      color: '#9fa7a7',
                      fontWeight: '400',
                    }}
                  >
                    Posted by {post.frontmatter.author} on {post.frontmatter.date}
                  </h4>
                </div>
              </div>
            </div>
          </div>
      </div>


      <div class="container pt-4 pb-4" style={{maxWidth: "760px"}}>
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-12">
            <article class="article-post" dangerouslySetInnerHTML={{ __html: post.html }}>
            </article>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        author
        date
      }
    }
  }
`