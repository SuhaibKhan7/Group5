export const typeDefs=`#graphql

type User{
id:ID!
name:String!
email:String!
}
type Post{
    id:ID!
    title:String!
}

type Query{
users:[User]
posts:[Post]
post(id:ID):Post
}

`