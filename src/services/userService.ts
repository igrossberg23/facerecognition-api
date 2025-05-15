import db from '../db.ts';

export const incrementUserEntries = async (userId: number) => {
  const userQuery = await db('users')
    .increment('entries')
    .where('id', '=', userId)
    .returning('entries');

  return userQuery[0];
};
