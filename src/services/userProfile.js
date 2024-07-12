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
