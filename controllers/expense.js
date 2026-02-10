const Expense = require("../models/expense");

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json({
      message: "Expenses fetched successfully",
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
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
