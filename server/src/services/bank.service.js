const { Bank } = require('../models');
const BankDeclineError = require('../errors/BankDeclineError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.findBank = async (predicate, transaction) => {
  const result = await Bank.findOne({ where: predicate, transaction });
  if (!result) throw new NotFoundError(`bank with this data doesn't exist`);
  return result.get({ plain: true });
};

module.exports.updateBankBalance = async (data, predicate, transaction) => {
  const [updatedCount, [updatedBank]] = await Bank.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updatedCount < 2) {
    throw new BankDeclineError('Bank decline transaction');
  }
};
