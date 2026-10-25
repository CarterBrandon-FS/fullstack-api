const Company = require("../models/Company");
const Messages = require("../messages/Message");

// GET ALL COMPANIES
const getAllCompanies = async (req, res) => {
  try {
    const filter = {};

    // Use req.query.search to match BOTH name and industry
    if (req.query.search) {
      filter.$or = [
        { industry: new RegExp(req.query.search, "i") },
        { name: new RegExp(req.query.search, "i") },
      ];
    }

    // Also keep industry filter just in case Postman uses it
    if (req.query.industry) {
      filter.industry = req.query.industry;
    }

    if (req.query.minFounded || req.query.maxFounded) {
      filter.foundedYear = {};
      if (req.query.minFounded) {
        filter.foundedYear.$gte = Number(req.query.minFounded);
      }
      if (req.query.maxFounded) {
        filter.foundedYear.$lte = Number(req.query.maxFounded);
      }
    }

    let selectFields = "-__v";
    if (req.query.select) {
      selectFields = req.query.select
        .split(",")
        .map((field) => field.trim())
        .join(" ");
    }

    let sortBy = "";
    if (req.query.sort) {
      sortBy = req.query.sort.split(",").join(" ");
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    let query = Company.find(filter)
      .select(selectFields)
      .skip(skip)
      .limit(limit);

    if (sortBy) {
      query = query.sort(sortBy);
    }

    const companies = await query;

    res.status(200).json({
      success: true,
      page,
      limit,
      count: companies.length,
      data: companies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id).select("-__v");

    if (!company) {
      return res.status(404).json({
        success: false,
        message: Messages.company_not_found,
      });
    }

    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json({
      success: true,
      message: Messages.company_created,
      data: company,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await Company.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: Messages.company_not_found,
      });
    }

    const company = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-__v");

    res.status(200).json({
      success: true,
      message: Messages.company_updated,
      data: company,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id).select("-__v");
    if (!company) {
      return res.status(404).json({
        success: false,
        message: Messages.company_not_found,
      });
    }

    await Company.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: Messages.company_deleted,
      data: company,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllCompanies,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
