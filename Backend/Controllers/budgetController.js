import Account from "../Models/Account.js";
import Budget from "../Models/Budget.js";

export const createAccount = async (req, res) => {
  try {
    const { user } = req;
    const { name, initialBalance } = req.body;

    if (!name) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingAccount = await Account.findOne({ name, user_id: user.id });
    if (existingAccount) {
      return res.status(400).json({
        message: "Account with the same name and user already exists.",
      });
    }

    const newAccount = new Account({
      name,
      balance: initialBalance,
      user_id: user.id,
    });

    await newAccount.save();
    res
      .status(201)
      .json({ message: "Account created successfully.", account: newAccount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating account.", error: error.message });
  }
};
export const getAccount = async (req, res) => {
  try {
    const { user } = req;

    const accounts = await Account.find({
      user_id: user.id,
    });
    if (accounts.length === 0) {
      return res.status(404).json({ message: "accounts not found." });
    }

    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching accounts.",
      error: error.message,
    });
  }
};
export const getBudgetbyAccountId = async (req, res) => {
  try {
    const { account_id } = req.params;

    const budgets = await Budget.find({ account_id });
    if (budgets.length === 0) {
      return res.status(404).json({ message: "Budgets not found." });
    }

    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching budgets.",
      error: error.message,
    });
  }
};
export const createBudget = async (req, res) => {
  try {
    const { name, description, amount } = req.body;
    const { account } = req;

    if (amount > account.balance) {
      return res.status(400).json({
        message: "Budget exceeds the available account balance",
        availableBalance: account.balance,
      });
    }
    const budget = new Budget({
      name,
      description,
      amount,
      account_id: account._id,
    });

    await budget.save();

    res.status(201).json({
      message: "Budget created successfully",
      name: name,
      description: description,
      amount: amount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating budget",
      error: error.message,
    });
  }
};
