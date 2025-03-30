export const getAuthToken = () => {
  const token = localStorage.getItem(`Token`);
  console.log("Hydrated token:", token);
  if (!token) {
    console.error("No admin token found");
    throw new Error("Authentication token is missing");
  }
  return token;
};

export const getAuthUser = () => {
  const user = JSON.parse(localStorage.getItem("admin"));
  if (!user) {
    console.error("No admin user found");
    throw new Error("Authentication user is missing");
  }
  return user;
};