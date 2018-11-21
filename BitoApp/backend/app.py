from flask import Flask, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/bito_db"
mongo = PyMongo(app)

@app.route("/")
def table1_data():
	sales_data = mongo.db.table1.find()
	output = []
	for ele in sales_data:
		output.append({'retail_sales' : ele['retail_sales'], 'whole_sales' : ele['whole_sales'], 'units_sold': ele['units_sold']})
	return jsonify({'result' : output})

if __name__ == '__main__':
	app.run(debug=True)