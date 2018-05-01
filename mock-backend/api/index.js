const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express")
const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  MockList,
} = require("graphql-tools")
const path = require("path")
const casual = require("casual")

app.use("/static", express.static(path.join(__dirname, "../static")))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  )
  next()
})

// The GraphQL schema in string form
const schemaString = `
   type Query {
      games(search: String): [Game]
      game(id: ID!): Game
      flow: [Session]
      session(id: ID!): Session
      people(search: String): [Person]
      person(id: ID!): Person
      search(search: String): SearchResult
      currentUser: Person
   }

   type Mutation {
     createSession(
       input: SessionInput
     ): CreateSessionPayload
     augmentSession(
       id: ID!
     ): Session
   }

   input SessionInput {
     games: [ID!]
     participants: [ParticipantInput]
   }

   type CreateSessionPayload {
     session: Session
    }

    type AugmentSessionPayload {
      session: Session
    }

   #scalar Date {}

    type SearchResult {
      games: [Game]
      locations: [Location]
      people: [Person]
    }

   type Game {
      id: ID
      title: String
      cover: Image
      sessions: [Session]
      averageRating: Float
      yearPublished: Int
      # Add BGG data
   }

   enum WinningCondition {
      HIGHEST
      LOWEST
      NONE
   }

   type Session {
      id: ID
      winningCondition: WinningCondition
      cooperative: Boolean
      games: [Game]
      playtime: Int
      variants: String
      location: Location
      comments: [Comment]
      participants: [Participant]
      images: [Image]
      # createdAt: Date
   }

   type Participant {
      id: ID!
      person: Person!
      score: Int
      rank: Int
      role: String
      isFirstPlay: Boolean
      ratings: [Rating]
   }

  input ParticipantInput {
      person: ID!
      score: Int
      rank: Int
      role: String
      ratings: [RatingInput]
   }

   type Location {
      id: ID
      name: String
      address: String
      lat: Float
      lng: Float
      sessions: [Session]
   }

   type Image {
      id: ID
      photographer: Person
      url: String
      session: [Session]
      isReported: Boolean
      # createdAt: Date
   }

   type Rating {
      id: ID!
      value: Float
      previous: Rating
      comment: Comment
      # createdAt: Date
      game: Game
      session: Session
      participant: Participant
      person: Person
   }

   input RatingInput {
     value: Float
     comment: CommentInput
     game: ID!
     session: ID
     participant: ID
     person: ID!
   }

   type Comment {
      id: ID
      content: String!
      # createdAt: Date
      writtenBy: Person
   }

   input CommentInput {
     content: String!
     writtenBy: ID!
   }

   type Stats {
      id: ID
      plays: Int
      wins: Int
      best: Int
      worst: Int
      average: Int
      person: Person
      game: Game
   }

   type Person {
      id: ID
      name: String
      avatar: Image
      sessions: [Session]
      ratings: [Rating]
      stats(games: [ID]): [Stats]
      followedBy: [Person]
      follows: [Person]
      isFollowingMe: Boolean
      isFollowedByMe: Boolean
      # Needs an account?
   }
`

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString })

const host = "http://192.168.0.4:3000"
// const host = "http://172.20.10.4:3000"

// Add mocks, modifies schema in place
addMockFunctionsToSchema({
  schema,
  mocks: {
    Query: () => ({
      flow: () => new MockList(10),
    }),
    Person: (o, { id }) => ({
      id,
      name: casual.first_name,
    }),
    Participant: () => ({
      score: casual.integer(30, 130),
      rank: casual.integer(1, 3),
    }),
    Rating: () => ({
      value: casual.integer(0, 10) / 2,
    }),
    Session: () => ({
      playtime: casual.integer(20, 200),
      games: () => new MockList([1, 2]),
      participants: () => new MockList([1, 8]),
    }),
    Game: () => ({
      title: casual.random_element([
        "Clans of Caledonia",
        "Caverna: The Cave Farmers",
      ]),
      averageRating: casual.integer(0, 10) / 2,
      yearPublished: casual.year,
    }),
    Location: () => ({
      name: casual.random_element([
        "Alphaspel",
        "Dragons Lair",
        casual.populate("Hemma hos {{first_name}}"),
      ]),
      address: casual.address,
      lat: casual.latitude,
      lng: casual.longitude,
    }),
    Image: (obj, args, context, { fieldName }) => {
      let url
      switch (fieldName) {
        case "cover":
          url = `${host}/static/covers/clansofcaledonia.png`
          break
        case "avatar":
          url = casual.random_element([
            `${host}/static/avatars/frdh.jpg`,
            `${host}/static/avatars/micke.jpg`,
          ])
          break
        default:
          url = casual.random_element([
            `${host}/static/photos/IMG_2669.jpg`,
            `${host}/static/photos/pic3809378.jpg`,
            `${host}/static/photos/IMG_2667.jpg`,
          ])
      }
      return { url }
    },
    Comment: () => ({
      content: casual.sentence,
    }),
  },
})

// The GraphQL endpoint
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }))

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }))

app.listen(3000, () =>
  console.log("Go to http://localhost:3000/graphiql to run queries!"),
)
