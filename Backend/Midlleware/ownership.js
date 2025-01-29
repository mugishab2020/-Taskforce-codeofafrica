import Account from "../Models/Account.js";

const checkAccountOwnership = async (req, res, next) => {
  const { account_id } = req.query;

  const { id: userId } = req.user;
  const account = await Account.findById(account_id);

  if (!account) {
    return res.status(404).json({ message: "Account not found." });
  }

  if (account.user_id.toString() !== userId) {
    return res.status(403).json({ message: "Unauthorized access." });
  }

  req.account = account;

  return next();
};

export default checkAccountOwnership;
