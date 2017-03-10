import { Mongo } from 'meteor/mongo';
// Create tasks collection in mongo
export const Tasks = new Mongo.Collection('tasks');