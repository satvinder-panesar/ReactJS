from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)
# connect to mongo instance with database name as bito_db
client = MongoClient('mongodb://localhost:27017/')
mydb = client['bito_db']
print("Database created")
table1 = mydb['table1']
table2 = mydb['table2']
print("Collections created")

# insert data into collections
table1.insert({'domain' : 'banking', 'stock_value' : 50})
table1.insert({'domain' : 'telecom', 'stock_value' : 100})
print("Data inserted")

@app.route("/getTable1Data")
def get_table1_data():
	stock_data = table1.find()
	output = []
	for ele in stock_data:

		# get existing details
		domain = ele['domain']

		# update details
		stock_value = random.randint(1, 200)

		# update records in db
		table1.update({'domain': domain}, {'domain': domain, 'stock_value': stock_value})

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
		table2.insert({'domain': domain, 'stock_value': stock_values[index]})
	return jsonify({'status' : 'OK'})

@app.route("/getTable2Data")
def get_table2_data():
	stock_data = table2.find().limit(100)
	output = []
	for ele in stock_data:

		# get existing details
		domain = ele['domain']
		stock_value = ele['stock_value']

		# prepare output
		output.append({'domain': domain, 'stock_value': stock_value})
	
	return jsonify({'result' : output})

if __name__ == '__main__':
	app.run(debug=True, use_reloader=False)