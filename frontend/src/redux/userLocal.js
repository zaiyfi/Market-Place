export const userLocally = async () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  try {
    const getUser = await fetch(`/api/auth/user/${auth.user._id}`, {
      method: "GET",
    });
    const token = auth.token;
    const user = await getUser.json();
    localStorage.setItem(
      "auth",
      JSON.stringify({
        token,
        user,
      })
    );
    const userLocal = await JSON.parse(localStorage.getItem("auth"));
    return userLocal;
  } catch (error) {
    throw Error({ error: "can't get user from localStorage!" });
  }
};
