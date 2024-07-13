const UserProfile = (() => {
  let user = {};

  const getName = () => {
    return user.name;
  };

  const getRole = () => {
    return user.role;
  };

  const setProfile = (name, role) => {
    user = { name, role };
  };

  const clearProfile = () => {
    console.log('Clearing user profile'); // Logging added for debugging
    user = {};
  };

  return {
    getName,
    getRole,
    setProfile,
    clearProfile
  };
})();

export default UserProfile;
