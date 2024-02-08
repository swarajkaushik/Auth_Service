const { where } = require("sequelize");
const { User, Role } = require("../models/index");
const ValidationError = require("../utils/validation-error");
const ClientError = require("../utils/client-error");
const StatusCode = require("http-status-codes");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Somethiong went wrong in repository layer");
      if (error.name === "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw error;
    }
  }

  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Somethiong went wrong in repository layer");
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("Somethiong went wrong in repository layer");
      throw error;
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (!user) {
        throw new ClientError(
          "AttributeNotFound",
          "Invalid email sent in the request",
          "Please check the email, as there is no recored found of the email",
          StatusCode.default.NOT_FOUND
        );
      }
      return user;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw error;
    }
  }
}

module.exports = UserRepository;
