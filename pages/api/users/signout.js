const signOutUser = async(req, res) => {
  res.send({ user: null, token: null });
};

export default signOutUser;