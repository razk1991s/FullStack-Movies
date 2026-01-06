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
  // 1) add to DB
  const newUser = await userRepo.createUser({
    UserName: data.UserName,
    Password: data.Password || "",
  });

  const userId = newUser._id.toString();

  // 2) add to users.json
  const users = readJson(usersPath);
  users.push({
    id: userId,
    firstName: data.firstName,
    lastName: data.lastName,
    createdDate: new Date().toISOString().split("T")[0],
    sessionTimeOut: data.sessionTimeOut,
  });
  writeJson(usersPath, users);

  // 3) add to permissions.json
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
  // 1) update DB
  const updatedUser = await userRepo.updateUser(id, {
    UserName: data.UserName,
  });

  // 2) update users.json
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

  // 3) update permissions.json
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
  // 1) delete from DB
  await userRepo.deleteUser(id);

  // 2) delete from users.json
  const users = readJson(usersPath).filter((u) => u.id !== id);
  writeJson(usersPath, users);

  // 3) delete from permissions.json
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
