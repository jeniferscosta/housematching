const bcrypt = require('bcrypt');

const comparePassword = async (password, hashedPassword) => {
	const match = await bcrypt.compare(password, hashedPassword);
	return match;
};

module.exports = comparePassword;