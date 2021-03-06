const handleRegister = (db, bcrypt, req, res) => {
	const {email, name, password}=req.body;
	if(!email || !password || !name) {
    return res.status(400).json('incorrect form submission');
  }
	const hash=bcrypt.hashSync(password);
  // transaction means that if one fails, all fails
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
				.returning('*')
				.insert({
					email: email,
					name: name,
					joined: new Date()
				})
				.then(user => {
					// console.log(user);
					res.json(user[0]);
				})      
			})
			.then(trx.commit)
			.catch(trx.rollback)
	})
	.catch(err => {
		console.log(err);
		res.status(400).json('unable to register')
	});
}

module.exports={
  handleRegister: handleRegister
};