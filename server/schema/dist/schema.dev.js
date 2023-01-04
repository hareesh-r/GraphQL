"use strict";

var graphql = require("graphql");

var _ = require("lodash");

var Book = require("../models/book");

var Author = require("../models/author");

var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLSchema = graphql.GraphQLSchema,
    GraphQLID = graphql.GraphQLID,
    GraphQLInt = graphql.GraphQLInt,
    GraphQLList = graphql.GraphQLList,
    GraphQLNonNull = graphql.GraphQLNonNull;
var books = [{
  name: "Name of the Wind",
  genre: "Fantasy",
  id: "1",
  authorId: "1"
}, {
  name: "The Final Empire",
  genre: "Fantasy",
  id: "2",
  authorId: "2"
}, {
  name: "The Long Earth",
  genre: "Sci-Fi",
  id: "3",
  authorId: "3"
}, {
  name: "The Hero of Ages",
  genre: "Fantasy",
  id: "4",
  authorId: "2"
}, {
  name: "The Colour of Magic",
  genre: "Fantasy",
  id: "5",
  authorId: "3"
}, {
  name: "The Light Fantastic",
  genre: "Fantasy",
  id: "6",
  authorId: "3"
}];
var authors = [{
  name: "Patrick Rothfuss",
  age: 44,
  id: "1"
}, {
  name: "Brandon Sanderson",
  age: 42,
  id: "2"
}, {
  name: "Terry Pratchett",
  age: 66,
  id: "3"
}];
var BookType = new GraphQLObjectType({
  name: "Book",
  fields: function fields() {
    return {
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
      genre: {
        type: GraphQLString
      },
      author: {
        type: AuthorType,
        resolve: function resolve(parent, args) {
          // return _.find(authors, { id: parent.authorid });
          return Author.findById(parent.authorId);
        }
      }
    };
  }
});
var AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: function fields() {
    return {
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
      age: {
        type: GraphQLInt
      },
      books: {
        type: new GraphQLList(BookType),
        resolve: function resolve(parent, args) {
          // return _.filter(books,{authorid: parent.id})
          return Book.find({
            authorId: parent.id
          });
        }
      }
    };
  }
});
var RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: function resolve(parent, args) {
        // return _.find(books, { id: args.id });
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: function resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: function resolve(parent, args) {
        // return books;
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: function resolve(parent, args) {
        // return authors;
        return Author.find({});
      }
    }
  }
});
var Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: GraphQLString
        },
        age: {
          type: GraphQLInt
        }
      },
      resolve: function resolve(parent, args) {
        var author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: GraphQLString
        },
        genre: {
          type: GraphQLString
        },
        authorId: {
          type: GraphQLID
        }
      },
      resolve: function resolve(parent, args) {
        var book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});