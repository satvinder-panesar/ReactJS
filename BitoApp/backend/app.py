from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/bito_db"
mongo = PyMongo(app)

@app.route("/getTable1Data")
def table1_data():
	sales_data = mongo.db.table1.find()
	output = []
	for ele in sales_data:

		# get existing details
		record_id = ele['record_id']
		retail_sales = ele['retail_sales']
		whole_sales = ele['whole_sales']
		units_sold = ele['units_sold']

		# update details
		retail_sales += 1
		whole_sales += 1
		units_sold += 1

		# update records in db
		mongo.db.table1.update({'record_id': record_id}, {'record_id' : record_id, 'retail_sales': retail_sales, 'whole_sales': whole_sales, 'units_sold': units_sold})

		# prepare output
		output.append({'record_id' : record_id, 'retail_sales' : retail_sales, 'whole_sales' : whole_sales, 'units_sold': units_sold})
	
	return jsonify({'result' : output})

if __name__ == '__main__':
	app.run(debug=True)