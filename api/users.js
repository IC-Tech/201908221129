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
const required = (a,b,c) => ([a=[a, []], a.push(a[0].forEach(c=>b.query[c] ? 0 : a[1].push(c))), a[1].length > 0 ? c.send(SendError([...a[1].map(a=>a+' required'), 'ErrorCode 0x01'])) : 0, a[1].length > 0])[3]

let cachedDb = null

const MDB = async() => (await (cachedDb ? cachedDb : cachedDb = await (await MongoClient.connect(process.env.mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })).db("ic-tech")).collection('users'))

//app.all('/api/users', async(req, res) => {
module.exports = async(req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Content-Type', 'application/json; charset=UTF-8')
	res.setHeader('WebServer', 'IC-Tech Server; Copyright (c) Imesh Chamara 2019')
	const db = await MDB()
	if(required(['action'], req, res)) return
  if(req.query.action == 'exists') {
  	if(required(['email'], req, res)) return
		var data = await db.findOne({type:'user', email: req.query.email})
		return res.send(SendData(data != null))
  }
  else if(req.query.action == 'get') {
  	if(required(['id'], req, res)) return
		var data = await db.findOne({type:'user', id: parseInt(req.query.id)})
		return res.send(SendData(data))
  }
	else return res.send(SendError(['undefined action', 'action required', 'ErrorCode 0x21']))
	return res.send(SendError(['Failed to response', 'Navigated to wrong direction', 'Internal Server Error', 'ErrorCode 0x22']))
res.send(req.query)
}
//);server.listen(process.env.PORT || 3001, () => console.log(`Listening on port ${process.env.PORT || 3001}!`)) // 3000
