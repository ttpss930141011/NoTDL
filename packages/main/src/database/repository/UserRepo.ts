import {User} from '/@/database/entity/User';
import {datasource} from '../index';
import {Not} from 'typeorm';

export const getOneUserWithIsActive = async (): Promise<User | null> => {
  const userRepository = datasource.getRepository(User);
  try {
    return await userRepository.findOneBy({is_active: true});
  } catch (error) {
    console.error('Failed to find user with is_active:', error);
    throw error;
  }
};

export const getUserByUserId = async (user_id: User['user_id']): Promise<User | null> => {
  const userRepository = datasource.getRepository(User);
  try {
    return await userRepository.findOneBy({user_id});
  } catch (error) {
    console.error('Failed to find user by sid:', error);
    throw error;
  }
};

export const getUserByName = async (name: string): Promise<User | null> => {
  const userRepository = datasource.getRepository(User);
  try {
    return await userRepository.findOneBy({name});
  } catch (error) {
    console.error('Failed to find user by username:', error);
    throw error;
  }
};

export const createUser = async (newUser: Partial<User>): Promise<User> => {
  const userRepository = datasource.getRepository(User);
  try {
    const user = userRepository.create(newUser);
    return await userRepository.save(user);
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};

export const updateUserByUserId = async (
  user_id: User['user_id'],
  updatedUser: Partial<User>,
): Promise<User | null> => {
  const userRepository = datasource.getRepository(User);
  try {
    await userRepository.update({user_id}, updatedUser);
    return await userRepository.findOneBy({user_id});
  } catch (error) {
    console.error('Failed to update user by sid:', error);
    throw error;
  }
};

export const disableOtherUsers = async (user_id: User['user_id']): Promise<void> => {
  const userRepository = datasource.getRepository(User);
  try {
    await userRepository.update({user_id: Not(user_id)}, {is_active: false});
  } catch (error) {
    console.error('Failed to disable other users:', error);
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  const userRepository = datasource.getRepository(User);
  try {
    await userRepository.delete(id);
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
};
