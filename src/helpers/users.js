import { apiFetchUsers, apiUpdateUserroles } from '../api/api';

export const fetchUsers = async () => {
  try {
    const usersData = await apiFetchUsers();
    return usersData;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const updateUserRoles = async (userId, roles) => {
  try {
    await apiUpdateUserroles(userId, roles);
  } catch (error) {
    console.error('Error updating roles:', error);
  }
};
