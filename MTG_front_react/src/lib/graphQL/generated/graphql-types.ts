import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Card = {
  __typename?: 'Card';
  border_color: Scalars['String']['output'];
  cardStacks: Array<CardStack>;
  card_id: Scalars['String']['output'];
  cmc: Scalars['Float']['output'];
  color_identity: Array<Scalars['String']['output']>;
  colors?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  image_uris: CardImageUris;
  lang: Scalars['String']['output'];
  mana_cost: Scalars['String']['output'];
  name: Scalars['String']['output'];
  oracle_id: Scalars['String']['output'];
  prices: CardPrice;
  produced_mana: Array<Scalars['String']['output']>;
  rarity: Scalars['String']['output'];
  released_at: Scalars['String']['output'];
  set: Scalars['String']['output'];
  set_name: Scalars['String']['output'];
  type_line: Scalars['String']['output'];
};

export type CardImageUris = {
  __typename?: 'CardImageUris';
  id: Scalars['ID']['output'];
  normal: Scalars['String']['output'];
  small: Scalars['String']['output'];
};

export type CardPaginationResponse = {
  __typename?: 'CardPaginationResponse';
  cards: Array<Card>;
  pageCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type CardPrice = {
  __typename?: 'CardPrice';
  id: Scalars['ID']['output'];
  usd: Scalars['String']['output'];
  usd_foil: Scalars['String']['output'];
};

export type CardQuery = {
  colors?: InputMaybe<Scalars['String']['input']>;
  currentPage?: InputMaybe<Scalars['Float']['input']>;
  rarity?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CardStack = {
  __typename?: 'CardStack';
  card: Card;
  deck: Deck;
  id: Scalars['ID']['output'];
};

export type CardStackInput = {
  cardId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type Deck = {
  __typename?: 'Deck';
  cardStacks: Array<CardStack>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  img_url: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ownerId: User;
};

export type DeckInput = {
  cardStacks: Array<CardStackInput>;
  description: Scalars['String']['input'];
  img_url: Scalars['String']['input'];
  name: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  auth: Scalars['String']['output'];
  createDeck: Deck;
  createUser: User;
  deleteDeck: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  updateUser: User;
};


export type MutationAuthArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateDeckArgs = {
  data: DeckInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteDeckArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  data: UserInput;
  id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllSets: Array<Set>;
  getCardByName: Array<Card>;
  getCards: Array<Card>;
  getCardsColors: Array<Scalars['String']['output']>;
  getCardsTypes: Array<Scalars['String']['output']>;
  getCardsWithQuery: CardPaginationResponse;
  getDecks: Array<Deck>;
  getDecksByUser: Array<Deck>;
  getUserById: User;
  getUsers: Array<User>;
};


export type QueryGetCardByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryGetCardsTypesArgs = {
  type_line: Scalars['String']['input'];
};


export type QueryGetCardsWithQueryArgs = {
  data: CardQuery;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
};


export type QueryGetDecksByUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  decks: Array<Deck>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Set = {
  __typename?: 'set';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type CreateUserMutationVariables = Exact<{
  data: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, username: string, email: string, password: string } };

export type GetCardsWithQueryQueryVariables = Exact<{
  data: CardQuery;
  size: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetCardsWithQueryQuery = { __typename?: 'Query', getCardsWithQuery: { __typename?: 'CardPaginationResponse', pageCount: number, totalCount: number, cards: Array<{ __typename?: 'Card', card_id: string, name: string, rarity: string, image_uris: { __typename?: 'CardImageUris', normal: string } }> } };

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'Query', getAllSets: Array<{ __typename?: 'set', name: string, value: string }> };

export type AuthMutationVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type AuthMutation = { __typename?: 'Mutation', auth: string };

export type GetCardByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type GetCardByNameQuery = { __typename?: 'Query', getCardByName: Array<{ __typename?: 'Card', id: string, name: string, image_uris: { __typename?: 'CardImageUris', normal: string } }> };


export const CreateUserDocument = gql`
    mutation CreateUser($data: UserInput!) {
  createUser(data: $data) {
    id
    username
    email
    password
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetCardsWithQueryDocument = gql`
    query GetCardsWithQuery($data: CardQuery!, $size: Int!, $page: Int!) {
  getCardsWithQuery(data: $data, size: $size, page: $page) {
    cards {
      card_id
      name
      rarity
      image_uris {
        normal
      }
    }
    pageCount
    totalCount
  }
}
    `;

/**
 * __useGetCardsWithQueryQuery__
 *
 * To run a query within a React component, call `useGetCardsWithQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCardsWithQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCardsWithQueryQuery({
 *   variables: {
 *      data: // value for 'data'
 *      size: // value for 'size'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetCardsWithQueryQuery(baseOptions: Apollo.QueryHookOptions<GetCardsWithQueryQuery, GetCardsWithQueryQueryVariables> & ({ variables: GetCardsWithQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCardsWithQueryQuery, GetCardsWithQueryQueryVariables>(GetCardsWithQueryDocument, options);
      }
export function useGetCardsWithQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCardsWithQueryQuery, GetCardsWithQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCardsWithQueryQuery, GetCardsWithQueryQueryVariables>(GetCardsWithQueryDocument, options);
        }
export function useGetCardsWithQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCardsWithQueryQuery, GetCardsWithQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCardsWithQueryQuery, GetCardsWithQueryQueryVariables>(GetCardsWithQueryDocument, options);
        }
export type GetCardsWithQueryQueryHookResult = ReturnType<typeof useGetCardsWithQueryQuery>;
export type GetCardsWithQueryLazyQueryHookResult = ReturnType<typeof useGetCardsWithQueryLazyQuery>;
export type GetCardsWithQuerySuspenseQueryHookResult = ReturnType<typeof useGetCardsWithQuerySuspenseQuery>;
export type GetCardsWithQueryQueryResult = Apollo.QueryResult<GetCardsWithQueryQuery, GetCardsWithQueryQueryVariables>;
export const QueryDocument = gql`
    query Query {
  getAllSets {
    name
    value
  }
}
    `;

/**
 * __useQueryQuery__
 *
 * To run a query within a React component, call `useQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryQuery(baseOptions?: Apollo.QueryHookOptions<QueryQuery, QueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
      }
export function useQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export function useQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export type QueryQueryHookResult = ReturnType<typeof useQueryQuery>;
export type QueryLazyQueryHookResult = ReturnType<typeof useQueryLazyQuery>;
export type QuerySuspenseQueryHookResult = ReturnType<typeof useQuerySuspenseQuery>;
export type QueryQueryResult = Apollo.QueryResult<QueryQuery, QueryQueryVariables>;
export const AuthDocument = gql`
    mutation Auth($password: String!, $email: String!) {
  auth(password: $password, email: $email)
}
    `;
export type AuthMutationFn = Apollo.MutationFunction<AuthMutation, AuthMutationVariables>;

/**
 * __useAuthMutation__
 *
 * To run a mutation, you first call `useAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authMutation, { data, loading, error }] = useAuthMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAuthMutation(baseOptions?: Apollo.MutationHookOptions<AuthMutation, AuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthMutation, AuthMutationVariables>(AuthDocument, options);
      }
export type AuthMutationHookResult = ReturnType<typeof useAuthMutation>;
export type AuthMutationResult = Apollo.MutationResult<AuthMutation>;
export type AuthMutationOptions = Apollo.BaseMutationOptions<AuthMutation, AuthMutationVariables>;
export const GetCardByNameDocument = gql`
    query GetCardByName($name: String!) {
  getCardByName(name: $name) {
    id
    name
    image_uris {
      normal
    }
  }
}
    `;

/**
 * __useGetCardByNameQuery__
 *
 * To run a query within a React component, call `useGetCardByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCardByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCardByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetCardByNameQuery(baseOptions: Apollo.QueryHookOptions<GetCardByNameQuery, GetCardByNameQueryVariables> & ({ variables: GetCardByNameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCardByNameQuery, GetCardByNameQueryVariables>(GetCardByNameDocument, options);
      }
export function useGetCardByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCardByNameQuery, GetCardByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCardByNameQuery, GetCardByNameQueryVariables>(GetCardByNameDocument, options);
        }
export function useGetCardByNameSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCardByNameQuery, GetCardByNameQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCardByNameQuery, GetCardByNameQueryVariables>(GetCardByNameDocument, options);
        }
export type GetCardByNameQueryHookResult = ReturnType<typeof useGetCardByNameQuery>;
export type GetCardByNameLazyQueryHookResult = ReturnType<typeof useGetCardByNameLazyQuery>;
export type GetCardByNameSuspenseQueryHookResult = ReturnType<typeof useGetCardByNameSuspenseQuery>;
export type GetCardByNameQueryResult = Apollo.QueryResult<GetCardByNameQuery, GetCardByNameQueryVariables>;