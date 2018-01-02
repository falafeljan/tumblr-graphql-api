// Welcome to Launchpad!
// Log in to edit and save pads, run queries in GraphiQL on the right.
// Click "Download" above to get a zip with a standalone Node.js server.
// See docs and examples at https://github.com/apollographql/awesome-launchpad

// graphql-tools combines a schema string with resolvers.
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

// Construct a schema, using GraphQL schema language
const typeDefs = `
	interface Post {
		id: ID!
		blog_name: String
		post_url: String
		source_url: String
		source_title: String
		timestamp: Int
		date: String
		type: String
		tags: [String]
	}

	type TextPost implements Post {
		id: ID!
		blog_name: String
		post_url: String
		source_url: String
		source_title: String
		timestamp: Int
		date: String
		type: String
		tags: [String]

		title: String
		body: String
	}

	type QuotePost implements Post {
		id: ID!
		blog_name: String
		post_url: String
		source_url: String
		source_title: String
		timestamp: Int
		date: String
		type: String
		tags: [String]

		source: String!
		text: String!
	}

	type LinkPost implements Post {
		id: ID!
		blog_name: String
		post_url: String
		source_url: String
		source_title: String
		timestamp: Int
		date: String
		type: String
		tags: [String]

		title: String
		url: String!
		author: String
		excerpt: String
		publisher: String
		description: String
	}

	type ChatMessage {
		name: String!
		label: String!
		phrase: String!
	}

	type ChatPost implements Post {
		id: ID!
		blog_name: String
		post_url: String
		source_url: String
		source_title: String
		timestamp: Int
		date: String
		type: String
		tags: [String]

		title: String
		body: String!
		dialogue: [ChatMessage]
	}

	type AudioPost implements Post {
		id: ID!
		blog_name: String
		post_url: String
		source_url: String
		source_title: String
		timestamp: Int
		date: String
		type: String
		tags: [String]

		caption: String
		player: String!
		plays: Int

		title: String
		album: String
		track_name: String
		track_number: Int
		year: Int

		embed: String
	}

	type PhotoAsset {
		width: Int!
		height: Int!
		url: String!
	}

	type Photo {
		caption: String
		alt_sizes: [PhotoAsset]
	}

	type PhotoPost implements Post {
		id: ID!
		blog_name: String
		post_url: String
		source_url: String
		source_title: String
		timestamp: Int
		date: String
		type: String
		tags: [String]

		caption: String
		photos: [Photo]!
		width: Int!
		height: Int!
	}

	type UnknownPost implements Post {
		id: ID!
		blog_name: String
		post_url: String
		source_url: String
		source_title: String
		timestamp: Int
		date: String
		type: String
		tags: [String]
	}

  type Query {
		getPosts(apiKey: String!, username: String!): [Post]
  }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export function context(headers, secrets) {
  return {
    headers,
    secrets,
  };
};
