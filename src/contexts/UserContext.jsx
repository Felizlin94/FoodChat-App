import { createContext } from "react";

const userAccounts = [
  { Id: 1, Username: "Snoopy", Password: "puppy" },
  { Id: 2, Username: "Anya", Password: "peanuts" },
  { Id: 3, Username: "Nohara", Password: "shiro" },
  { Id: 4, Username: "1", Password: "23" },
];

const currentUser = "";

const UserContext = createContext("");

export { userAccounts, currentUser, UserContext };
