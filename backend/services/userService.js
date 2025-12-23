const userRepo = require("../repository/dbUserRepo");
const fs = require("fs");
const path = require("path");

// נתיבי הקבצים
const usersPath = path.join(__dirname, "..", "data", "users.json");
const permissionsPath = path.join(__dirname, "..", "data", "permissions.json");

// ------------------------------------------------------
// JSON helpers
// ------------------------------------------------------
function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ------------------------------------------------------
// USERS SERVICE (MongoDB + JSON)
// ------------------------------------------------------

// GET all users (DB + JSON + permissions)
async function getAllUsers() {
  const usersFromDB = await userRepo.getAllUsers();
  const usersJson = readJson(usersPath);
  const permissionsJson = readJson(permissionsPath);

  return usersFromDB.map((dbUser) => {
    const jsonUser = usersJson.find((u) => u.id === dbUser._id.toString());
    const permUser = permissionsJson.find(
      (p) => p.id === dbUser._id.toString()
    );

    return {
      id: dbUser._id,
      UserName: dbUser.UserName,
      firstName: jsonUser?.firstName,
      lastName: jsonUser?.lastName,
      createdDate: jsonUser?.createdDate,
      sessionTimeOut: jsonUser?.sessionTimeOut,
      permissions: permUser?.permissions || [],
    };
  });
}

// GET user by ID
async function getUserById(id) {
  const dbUser = await userRepo.getUserById(id);
  const usersJson = readJson(usersPath);
  const permissionsJson = readJson(permissionsPath);

  const jsonUser = usersJson.find((u) => u.id === id);
  const permUser = permissionsJson.find((p) => p.id === id);

  return {
    id: dbUser._id,
    UserName: dbUser.UserName,
    firstName: jsonUser?.firstName,
    lastName: jsonUser?.lastName,
    createdDate: jsonUser?.createdDate,
    sessionTimeOut: jsonUser?.sessionTimeOut,
    permissions: permUser?.permissions || [],
  };
}

// CREATE user (DB + JSON)
async function createUser(data) {
  // 1) צור משתמש ב־MongoDB
  const newUser = await userRepo.createUser({
    UserName: data.UserName,
    Password: "", // משתמש חדש חייב להגדיר סיסמה ב־CreateAccount
  });

  const userId = newUser._id.toString();

  // 2) הוסף ל־users.json
  const users = readJson(usersPath);
  users.push({
    id: userId,
    firstName: data.firstName,
    lastName: data.lastName,
    createdDate: new Date().toISOString().split("T")[0],
    sessionTimeOut: data.sessionTimeOut,
  });
  writeJson(usersPath, users);

  // 3) הוסף ל־permissions.json
  const perms = readJson(permissionsPath);
  perms.push({
    id: userId,
    permissions: data.permissions,
  });
  writeJson(permissionsPath, perms);

  return newUser;
}

// UPDATE user (DB + JSON)
async function updateUser(id, data) {
  // 1) עדכון DB
  const updatedUser = await userRepo.updateUser(id, {
    UserName: data.UserName,
  });

  // 2) עדכון users.json
  const users = readJson(usersPath);
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    users[index] = {
      ...users[index],
      firstName: data.firstName,
      lastName: data.lastName,
      sessionTimeOut: data.sessionTimeOut,
    };
    writeJson(usersPath, users);
  }

  // 3) עדכון permissions.json
  const perms = readJson(permissionsPath);
  const pIndex = perms.findIndex((p) => p.id === id);
  if (pIndex !== -1) {
    perms[pIndex].permissions = data.permissions;
    writeJson(permissionsPath, perms);
  }

  return updatedUser;
}

// DELETE user (DB + JSON)
async function deleteUser(id) {
  // 1) מחיקה מ־DB
  await userRepo.deleteUser(id);

  // 2) מחיקה מ־users.json
  const users = readJson(usersPath).filter((u) => u.id !== id);
  writeJson(usersPath, users);

  // 3) מחיקה מ־permissions.json
  const perms = readJson(permissionsPath).filter((p) => p.id !== id);
  writeJson(permissionsPath, perms);

  return { message: "User deleted" };
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
