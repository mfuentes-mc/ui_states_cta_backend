const fs = require('fs');
const usersFilePath = './src/data.json';

const loadData = () => {
  try {
    const jsonData = fs.readFileSync(usersFilePath);
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error al leer los datos:', error);
    return [];
  }
};

const saveData = (data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(usersFilePath, jsonData);
  } catch (error) {
    console.error('Error al guardar los datos:', error);
  }
};

const createUser = (req, res) => {
  const { name, email } = req.body;

  const users = loadData();

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  
  saveData(users);
  
  res.status(201).json(newUser);
};

const getUsers = (req, res) => {
  const users = loadData();
  
  res.json(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const users = loadData();
  const user = users.find(user => user.id === Number(id));

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.json(user);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const users = loadData();
  const user = users.find(user => user.id === Number(id));

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  user.name = name || user.name;
  user.email = email || user.email;

  saveData(users);
  
  res.json(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const users = loadData();
  const index = users.findIndex(user => user.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const deletedUser = users.splice(index, 1)[0];

  saveData(users);
  
  res.json(deletedUser);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
