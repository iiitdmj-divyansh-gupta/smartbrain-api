const handleProfileGet =  (db) => (req, res) => {
	// grabbing parameter id
	const {id} = req.params;
	db.select('*').from('users').where({id})
	.then(user => {
		// console.log(user);
		if(user.length > 0)
			res.json(user[0]);
		else
			res.status(400).json('error getting data');
	});
}

module.exports={
  handleProfileGet: handleProfileGet
};