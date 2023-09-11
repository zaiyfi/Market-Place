export const userLocally = async () => {
  try {
    const userLocal = await JSON.parse(localStorage.getItem("auth"));
    return userLocal;
  } catch (error) {
    throw Error({ error: "can't get user from localStorage!" });
  }
};
