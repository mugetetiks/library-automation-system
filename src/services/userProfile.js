var UserProfile = (function() {
    var getName = function() {
      return localStorage.getItem('username');    
    };
  
    var setName = function(name) {
      localStorage.setItem('username', name);
    };
  
    var getRole = function() {
      return localStorage.getItem('role');    
    };
  
    var setRole = function(role) {
      localStorage.setItem('role', role);
    };
  
    var clearProfile = function() {
      localStorage.removeItem('username');
      localStorage.removeItem('role');
    };
  
    return {
      getName: getName,
      setName: setName,
      getRole: getRole,
      setRole: setRole,
      clearProfile: clearProfile
    }
  
  })();
  
  export default UserProfile;
  