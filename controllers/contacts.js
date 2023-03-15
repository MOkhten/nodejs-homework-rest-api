const { Contact } = require('../models/contact');

const { NotFound } = require('http-errors');

const getAll = async (req, res) => {
  
  const contacts = await Contact.find({}, '-createdAt -updatedAt');
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
    const result = await Contact.findById(contactId);
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
   const result = await Contact.create(req.body);
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
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw new NotFound(`Product with id =${contactId} is not found`);
    }
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
    const result = await Contact.findByIdAndDelete(contactId);
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

const updateByFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
    if (!result) {
      throw new NotFound(`Not found`);
    }
    res.json({
      status: 'success',
      code: 200,
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
  removeById,
  updateByFavorite,
};

