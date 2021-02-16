import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    isExpert:true
  },
  {
    name: "Jhon Dow",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    isExpert:true
  },
  {
    name: "Jane Dow",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
export default users;
