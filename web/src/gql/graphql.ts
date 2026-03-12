/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A scale representing a date and time in ISO 8601 format. */
  DateTime: { input: any; output: any; }
};

/** Standard error interface. */
export type Error = {
  /** A human-readable error message. */
  message: Scalars['String']['output'];
};

/** The result of the 'me' query. */
export type MeResult = UnauthenticatedError | User;

export type Mutation = {
  __typename?: 'Mutation';
  /** Updates the profile of the currently authenticated user. */
  updateProfile: UpdateProfileResult;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};

/** An object with a globally unique ID. */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** The currently authenticated user. */
  me: MeResult;
};

/** Information about a user's subscription. */
export type SubscriptionInfo = {
  __typename?: 'SubscriptionInfo';
  /** When the subscription was created. */
  createdAt: Scalars['DateTime']['output'];
  /** When the subscription is set to expire. */
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  /** The subscription tier. */
  plan: SubscriptionPlan;
  /** The current status of the subscription. */
  status: SubscriptionStatus;
};

/** Available subscription tiers. */
export enum SubscriptionPlan {
  Free = 'FREE',
  Pro = 'PRO'
}

/** Current status of a subscription. */
export enum SubscriptionStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

/** Returned when the user is not authenticated. */
export type UnauthenticatedError = Error & {
  __typename?: 'UnauthenticatedError';
  message: Scalars['String']['output'];
};

/** Returned when a user attempts an action they don't have permission for. */
export type UnauthorizedError = Error & {
  __typename?: 'UnauthorizedError';
  message: Scalars['String']['output'];
  /** The permission that was required but missing. */
  requiredPermission?: Maybe<Scalars['String']['output']>;
};

/** Input for updating a user profile. */
export type UpdateProfileInput = {
  /** The new full name of the user. */
  fullName: Scalars['String']['input'];
};

/** The result of the 'updateProfile' mutation. */
export type UpdateProfileResult = UnauthenticatedError | UnauthorizedError | UpdateProfileSuccess | ValidationError;

/** Returned when the profile update is successful. */
export type UpdateProfileSuccess = {
  __typename?: 'UpdateProfileSuccess';
  /** The updated user object. */
  user: User;
};

/** A user account in the system. */
export type User = Node & {
  __typename?: 'User';
  /** When the user account was created. */
  createdAt: Scalars['DateTime']['output'];
  /** The user's email address. */
  email: Scalars['String']['output'];
  /** The user's full name. */
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The user's current subscription details. */
  subscription?: Maybe<SubscriptionInfo>;
  /** When the user account was last updated. */
  updatedAt: Scalars['DateTime']['output'];
};

/** Returned when input validation fails. */
export type ValidationError = Error & {
  __typename?: 'ValidationError';
  /** The field that caused the validation error. */
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me:
    | { __typename?: 'UnauthenticatedError', message: string }
    | { __typename?: 'User', id: string, email: string, fullName?: string | null, createdAt: any, subscription?: { __typename?: 'SubscriptionInfo', plan: SubscriptionPlan, status: SubscriptionStatus, expiresAt?: any | null, createdAt: any } | null }
   };


export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"subscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UnauthenticatedError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;