import axios from 'axios';

const apiUrl = "https://frontend-test-assignment-api.abz.agency/api/v1";
export const usersOnPage = 6;
const firstPage = `${apiUrl}/users/?page=1&count=${usersOnPage}`;

export const fetchUsersApi = async (usersUrl: string | null = firstPage) => {
  let result = { users: [], next_url: null };
  if (usersUrl) {
    try {
      const response = await axios.get(usersUrl);
      result = {
        users: response.data.users, next_url: response.data.links.next_url
      };
    } catch (error) {
      console.log(error.message);
    }
  };
  return result;
}

export const fetchPositions = async () => {
  const result: any[] = [];
  try {
    const response = await axios.get(`${apiUrl}/positions`);
    if (response.data.success) {
      return [...response.data.positions];
    }
    throw new Error('fetchPositions - something wrong');
  } catch (error) {
    console.log(error.message);
  }
  return result;
};

export const registerUserApi = async (data: any) => {

  let user = { name: data.get("name"), phone: data.get("phone"), email: data.get("email"), position_id: data.get("position_id"), position: data.get("position"), photo: URL.createObjectURL(data.get("photo") as File), id: undefined };
  let result = { user, status: { success: false, message: '', fails: {} } };
  try {
    const response = await axios.get(`${apiUrl}/token`);
    if (response.data.success) {
      const userResponse = await axios.post(`${apiUrl}/users`, data, {
        headers: {
          token: response.data.token
        }
      });
      user = { ...user, id: userResponse.data?.user_id };
      result = { user, status: { success: userResponse.data?.success, message: userResponse.data?.message, fails: userResponse.data?.failes } }
    } else {
      throw new Error("registerUserApi - Something wrong");
    }
  } catch (error) {
    const { response } = error;
    if (response) {
      result = { ...result, status: { success: response?.data?.success, message: response?.data?.message, fails: response?.data?.fails } };
    }
    console.log(error.message);
  }
  return result;
}
