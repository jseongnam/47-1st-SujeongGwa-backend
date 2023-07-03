const { userService } = require('../services');

const signIn = async (req, res) => {
  const { type_id, email, account, password } = req.body;

  try {
    let accessToken;
    const userTypeEnum = Object.freeze({
      NORMAL_USER: 1,
      BUSINESS_OWNER: 2,
      CORPORATION: 3,
    });

    if (type_id === userTypeEnum.NORMAL_USER) {
      accessToken = await userService.signInWithEmail(email, password);
    } else {
      accessToken = await userService.signInWithAccount(account, password);
    }

    res.status(200).json({ message: 'Login Success', accessToken });
  } catch (error) {
    res.status(error.statusCode || 401).json({ message: error.message });
  }
};

const myaccount = async function (req, res) {
  try {
    const userId = 32;
    const result = await userService.getmyaccount(userId);
    return res.status(200).json(result);
  } catch (error) {
    const errorMessage = 'DATABASE_QUERY_ERROR';
    return res.status(400).json({
      error: errorMessage,
    });
  }
};
module.exports = {
  signIn,
  myaccount,
};
