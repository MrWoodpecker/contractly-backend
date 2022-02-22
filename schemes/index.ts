import { mergeTypeDefs } from '@graphql-tools/merge';
import { buildSchema } from 'graphql';

import contract from './contract';



const types = [contract];

export default buildSchema(mergeTypeDefs(types, { commentDescriptions: true }));