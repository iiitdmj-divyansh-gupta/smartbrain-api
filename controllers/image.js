// as the api key was visible in image headers in the network tab
// we had to remove it from front-end to the back-end

const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'ec5bc166d7f047f69920672433d0bb7f'
});

const handleApiCall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to fetch from API'));
}

const handleImage = (req, res, db)=> {
	// grabbing id from body of request sent
	const {id} = req.body;
	db('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		// console.log(entries);
		if(entries.length > 0)
			res.json(entries[0]);
		else
			res.status(400).json('unable to get account');
	})
	.catch(err => res.status(400).json('unable to get account'));
}

module.exports={
  handleImage,
  handleApiCall
};