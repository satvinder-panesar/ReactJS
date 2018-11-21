from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/bito_db"
mongo = PyMongo(app)

@app.route("/getTable1Data")
def table1_data():
	stock_data = mongo.db.table1.find()
	output = []
	for ele in stock_data:

		# get existing details
		record_id = ele['record_id']
		domain = ele['domain']
		stock_value = ele['stock_value']

		# update details
		stock_value += 1

		# update records in db
		mongo.db.table1.update({'record_id': record_id}, {'record_id' : record_id, 'domain': domain, 'stock_value': stock_value})

		# prepare output
		output.append({'record_id' : record_id, 'domain': domain, 'stock_value': stock_value})
	
	return jsonify({'result' : output})

if __name__ == '__main__':
	app.run(debug=True)