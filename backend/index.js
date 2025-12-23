const express = require('express');
const connectDB = require('./config/moviesDB');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

// התחברות למסד הנתונים
connectDB();

// דוגמה לנתיבי API
// יש ליצור את הקבצים המתאימים בתיקיית routers
app.use('/api/movies', require('./routers/moviesRouter'));
app.use('/api/members', require('./routers/membersRouter'));
app.use('/api/subscriptions', require('./routers/subscriptionsRouter'));
app.use('/api/users', require('./routers/usersRouter'));

app.get('/', (req, res) => {
	res.send('Cinema Management System Backend');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
