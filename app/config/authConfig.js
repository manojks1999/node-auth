const authConfig = {
    secret: process.env.SECRET || "CeVcweW300SFUJ7S0gY2u3ox4639J6TV4hDWYuWvWkAYbCh30zPHsXZdWd4v5Lye",
    EXPIRES_IN: process.env.EXPIRES_IN || 86400,
    EXPIRES_REFRESH_IN: process.env.EXPIRES_REFRESH_IN || 86400
  };

  export default authConfig