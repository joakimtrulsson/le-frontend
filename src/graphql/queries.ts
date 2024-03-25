import { gql } from '@apollo/client';

export const GET_ORDERDETAILS = gql`
  query Order($where: OrderWhereUniqueInput!) {
    order(where: $where) {
      id
      customerName
      customerEmail
      createdAt
    }
  }
`;

export const GET_HERO = gql`
  query SiteConfig {
    siteConfig {
      siteTitle
      heroPreamble {
        document
      }
      heroImage1 {
        url
      }
      heroImage2 {
        url
      }
      heroImage3 {
        url
      }
      heroImage4 {
        url
      }
    }
  }
`;

export const GET_PREAMBLE = gql`
  query SiteConfig {
    siteConfig {
      ourLocationPreamble {
        document
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query Query($where: ProductWhereInput!, $orderBy: [ProductOrderByInput!]!) {
    products(where: $where, orderBy: $orderBy) {
      id
      productTitle
      description
      price
      priceUnit
      productImage {
        url
      }
      productCategory {
        categoryTitle
      }
      discountPrice
    }
    siteConfig {
      productsPreamble {
        document
      }
    }
  }
`;

export const GET_PRODUCT_CATEGORIES = gql`
  query ProductCategories {
    productCategories {
      id
      categoryTitle
    }
  }
`;

export const GET_PROJECTS = gql`
  query Query($orderBy: [ProjectOrderByInput!]!) {
    projects(orderBy: $orderBy) {
      id
      projectTitle
      shortDescription
      fullDescription
      projectImage {
        url
      }
      location
      icon
      date
    }
    siteConfig {
      projectsPreamble {
        document
      }
    }
  }
`;

export const GET_REVIEWS = gql`
  query Reviews($orderBy: [ReviewOrderByInput!]!) {
    reviews(orderBy: $orderBy) {
      id
      reviewBy
      reviewText
      location
      date
    }
    siteConfig {
      reviewsPreamble {
        document
      }
    }
  }
`;

export const GET_SERVICE_PREAMBLE = gql`
  query SiteConfig {
    siteConfig {
      ourServicesPreamble {
        document
      }
    }
  }
`;
