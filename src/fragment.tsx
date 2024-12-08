import { gql } from "@apollo/client";


export const CORE_COMMENT_FIELDS = gql`
  fragment CoreCommentFields on Comment {
    id
    postedBy{
      username
      displayName
    }
    createdAt
    content
  }
`


export const GET_POST_DETAILS = gql`
${CORE_COMMENT_FIELDS}
 query CommentForPost($postId: ID!){
  post(postId: $postId){
    title
    body
    author
    comments {
      ...CoreCommentFields
    }
  }
 }

`