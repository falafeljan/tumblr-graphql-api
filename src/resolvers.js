import fetch from 'node-fetch'

const resolvers = {
  Query: {
    getPosts: async (root, args, context) => {
      const res = await fetch(`https://api.tumblr.com/v2/blog/${args.username}.tumblr.com/posts?notes_info=true&reblog_info=true&api_key=${args.apiKey}`);
      const data = await res.json();
      
      return data.response.posts
    }
  },

  Post: {
    __resolveType(obj, context, info){
      switch (obj.type) {
        case 'audio': return 'AudioPost';
        case 'chat': return 'ChatPost';
        case 'link': return 'LinkPost';
        case 'text': return 'TextPost';
        case 'photo': return 'PhotoPost';
        case 'quote': return 'QuotePost';
        default: return 'UnknownPost';
      }
    },
  },
};

export default resolvers;
