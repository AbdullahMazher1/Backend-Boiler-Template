const bcrypt = require('bcrypt');
const isMatch = async(password, userPassword) => {
    const status = await bcrypt.compare(password, userPassword);
    return status;
}

module.exports = isMatch;