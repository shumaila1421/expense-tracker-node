const Expense = require("../models/expense");
const mongoose = require("mongoose");

// Get all expenses with optional filters & monthly totals
exports.getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category, startDate, endDate } = req.query;

    // Build filter object
    let filter = { user: userId };

    if (category) filter.category = category;

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });

    // Calculate total amount of fetched expenses
    const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Monthly totals for all expenses
    const monthlyTotals = await Expense.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.status(200).json({
      message: expenses.length
        ? "Expenses fetched successfully"
        : "No expenses found",
      data: expenses,
      totalAmount,
      monthlyTotals,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add expense
exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, notes } = req.body;
    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      date,
      notes,
    });
    res.status(201).json({
      message: "Expense created successfully",
      data: expense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    if (expense.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    if (expense.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await expense.remove();

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
