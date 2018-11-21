from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/bito_db"
mongo = PyMongo(app)

@app.route("/getTable1Data")
def get_table1_data():
	stock_data = mongo.db.table1.find()
	output = []
	for ele in stock_data:

		# get existing details
		domain = ele['domain']

		# update details
		stock_value = random.randint(1, 200)

		# update records in db
		mongo.db.table1.update({'domain': domain}, {'domain': domain, 'stock_value': stock_value})

		# prepare output
		output.append({'domain': domain, 'stock_value': stock_value})
	
	return jsonify({'result' : output})

@app.route("/saveToTable2", methods=['POST'])
def save_to_table2():
	domains = request.form.get("domains")
	stock_values = request.form.get("stock_values")
	domains = domains.split(",")
	stock_values = stock_values.split(",")
	for index, domain in enumerate(domains):
		mongo.db.table2.insert({'domain': domain, 'stock_value': stock_values[index]})
	return jsonify({'status' : 'OK'})

if __name__ == '__main__':
	app.run(debug=True)