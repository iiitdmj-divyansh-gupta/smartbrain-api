const express=require('express');
const cors=require('cors');
const knex=require('knex');
const bcrypt=require('bcrypt-nodejs');

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true;
	}
});

// console.log(db.select('*').from('users'));
// db.select('*').from('users').then(data => {
// 	console.log(data);
// })

const app=express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send('It is working')});

// dependency injection
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
// same thing written in two other ways using advanced functions
app.post('/register', (req, res) => {register.handleRegister(db, bcrypt)(req, res)})
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is listening on port ${process.env.PORT}`);
	// console.log(process.env);
})


/*
/ --> res = this is working
/signin --> POST
/register --> POST
/profile/:userTd --> GET = user
/image --> PUT --> user


// port 3000 may not necesarily be available
// env.PORT doesn't exist, so in order to access
// and use enviormenta variable o this system, 
// we have to inject it first

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
})
console.log(PORT);


*/