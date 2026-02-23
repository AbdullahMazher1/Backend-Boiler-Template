const throwError = (res, error) => {
     res.json({ 'success': false, 'message': { error } });
};

module.exports = { throwError };