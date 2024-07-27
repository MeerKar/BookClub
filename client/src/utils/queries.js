import { gql } from "@apollo/client";

//user
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      books {
        _id
        title
        author
        createdAt
      }
      clubs {
        _id
        name
      }
    }
  }
`;

//books
export const QUERY_BOOKS = gql`
  query getBOOKS {
    books {
      _id
      title
      author
      image
      reviews {
        _id
        reviewText
        userId
      }
      createdAt
    }
  }
`;
export const QUERY_BOOKSHELF = gql`
  query getBookshelf($userId: ID!) {
    bookshelf(userId: $userId) {
      _id
      title
      author
      description
      book_image
      primary_isbn10
      category
    }
  }
`;

//single book

export const QUERY_SINGLE_BOOK = gql`
  query getsingleBook($bookId: ID!) {
    book(bookId: $bookId) {
      id
      title
      author
      image
      description
      createdAt
      links {
        site
        url
      }
      reviews {
        user
        comment
      }
    }
  }
`;

//me
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      books {
        _id
        title
        author
        image
        createdAt
      }
    }
  }
`;

//clubs
export const QUERY_CLUBS = gql`
  query getCLUBS {
    clubs {
      _id
      name
      createdAt
    }
  }
`;

//single club
export const QUERY_SINGLE_CLUB = gql`
  query getSingleClub($clubId: ID!) {
    club(clubId: $clubId) {
      _id
      name
      books {
        _id
        title
        author
      }
      users {
        _id
        username
      }
      createdAt
    }
  }
`;
export const QUERY_BOOK_BY_TITLE = gql`
  query bookByTitle($title: String!) {
    bookByTitle(title: $title) {
      _id
      title
      author
      image
      review
      rating
      createdAt
      bookReviewAuthor
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;
export const ADD_TO_BOOKSHELF = gql`
  mutation addToBookshelf($bookId: ID!, $userId: ID!) {
    addToBookshelf(bookId: $bookId, userId: $userId) {
      _id
      username
      email
      books {
        _id
        title
        author
        image
        description
        review
        createdAt
      }
    }
  }
`;
// export const ADD_USER = gql`
//   mutation addUser($username: String!, $email: String!, $password: String!) {
//     addUser(username: $username, email: $email, password: $password) {
//       token
//       user {
//         _id
//         username
//       }
//     }
//   }
// `;
export const ADD_REVIEW = gql`
  mutation AddReview($bookId: ID!, $reviewText: String!, $userId: ID!) {
    addReview(bookId: $bookId, reviewText: $reviewText, userId: $userId) {
      _id
      reviewText
      createdAt
      username
    }
  }
`;
