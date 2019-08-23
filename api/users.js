const url = require('url')
const MongoClient = require('mongodb').MongoClient
/*
const express = require('express')
const app = express()
var server = require('http').Server(app)
//*/
const defaultError = ['Failed to response', 'undefined system error', 'Internal Server Error']

const SendData = v => JSON.stringify({ success:true, response: v })
const SendError = v => JSON.stringify({ success:false, error: v })

let cachedDb = null
const MDB = async() => (await (cachedDb ? cachedDb : cachedDb = await (await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })).db("ic-tech")).collection('users'))

//app.all('/api/temp',  async(req, res) => {
module.exports = async(req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Content-Type', 'application/json; charset=UTF-8')
	res.setHeader('WebServer', 'IC-Tech Server; Copyright (c) Imesh Chamara 2019')
	const hostname = req.protocol + '://' + req.get('host') + '/'
	var path = url.parse(req.url).pathname
	console.log('path: ' + path)
  if(path != '/User/get/profile') {
		var db = await MDB()
		var data = await db.findOne({id: 1})
		return res.send(JSON.stringify(data))
  }
	else return res.send(SendError(['undefined action', 'action required', 'ErrorCode 0x21']))
	return res.send(SendError(['Failed to response', 'Navigated to wrong direction', 'Internal Server Error', 'ErrorCode 0x22']))
}
//);server.listen(process.env.PORT || 3001, () => console.log(`Listening on port ${process.env.PORT || 3001}!`)) // 3000
