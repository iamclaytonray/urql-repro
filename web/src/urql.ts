import { offlineExchange } from '@urql/exchange-graphcache';
import { makeDefaultStorage } from '@urql/exchange-graphcache/default-storage';
import { createClient, dedupExchange, fetchExchange } from 'urql';

const schema = {
  __schema: {
    queryType: { name: 'Query' },
    mutationType: { name: 'Mutation' },
    subscriptionType: { name: 'Subscription' },
  },
};

const storage = makeDefaultStorage({
  idbName: 'graphcache-v3', // The name of the IndexedDB database
  maxAge: 7, // The maximum age of the persisted data in days
});

const cacheExchange = offlineExchange({
  schema,
  storage,
  updates: {},
  optimistic: {},
});

export const client = createClient({
  url: 'http://localhost:3000/',
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
});
