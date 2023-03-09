const fs = require('fs/promises');
const path = require("path");
const { v4: uuidv4 } = require("uuid");


const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
   try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }

};

const getContactById = async (contactId) => {
   try {
    const data = await listContacts();
    const contact = data.find((item) => item.id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return result;
  } catch (error) {
    console.error('\x1B[31m Error while deleting contact!');
    throw new Error(error);
  }
}

const addContact = async (body) => {
  const newContact = { id: uuidv4(), ...body };
  const contacts = await listContacts();
  const changedContacts = [...contacts, newContact];
  fs.writeFile(contactsPath, JSON.stringify(changedContacts));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
