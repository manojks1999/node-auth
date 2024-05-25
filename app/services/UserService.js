class UserService {
    getAllAccessContent() {
      return "Public Content.";
    }
  
    getUserBoardContent() {
      return "User Content.";
    }
  
    getAdminBoardContent() {
      return "Admin Content.";
    }
  
    getModeratorBoardContent() {
      return "Moderator Content.";
    }
  }
  
  export default new UserService();
  