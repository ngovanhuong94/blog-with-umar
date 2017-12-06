var express = require('express')



var app = express()

app.get('/', (req,res) => {
	res.send({
		test: "OK"
	})
})


app.listen(process.env.PORT || 3000, () => console.log("Server is running"))