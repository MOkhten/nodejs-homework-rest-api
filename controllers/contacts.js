const contactOperations = require('../models/contacts');

const { NotFound } = require('http-errors');

const getAll = async (req, res) => {
  
    const contacts = await contactOperations.listContacts();
    res.json({
    status: 'success',
      code: 200,
      data: {
        result: contacts
      }
      })
}


const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactOperations.getContactById(contactId);
    if (!result) {
      throw new NotFound(`Product with id =${contactId} is not found`);
    }
    res.json({
    status: 'success',
      code: 200,
      data: {
        result
      }
      })
}

const add = async (req, res) => {
    const result = await contactOperations.addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result
      }
    });
}

const updateById = async (req, res) => {
  const { contactId } = req.params;
    const result = await contactOperations.updateContact(contactId, req.body);
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    });
}

const removeById = async (req, res) => {
    const {contactId } = req.params;
    const result = await contactOperations.removeContact(contactId);
    if (!result) {
      throw new NotFound(`Product with id =${contactId} is not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      message: "contact deleted",
      data: {
        result
      }
    });
}

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  removeById
};

