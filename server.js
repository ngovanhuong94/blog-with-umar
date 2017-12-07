const express = require('express')
const bodyParser = require('body-parser');
const apiRoutes = require('./api/routes/index');



const app = express()
app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.get('/', (req,res) => {
	res.send({
		test: "OK"
	})
})


app.listen(process.env.PORT || 3000, () => console.log("Server is running"))