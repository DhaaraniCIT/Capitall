import flask
import sys
from flask import Flask,request,render_template,jsonify,json
from flask_cors import CORS
import hashlib 
import math, random
import MySQLdb
import base64 

app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

hostname = "localhost"
username = "root"
password = ""
database = "switchme"

@app.route('/login', methods=['POST']) 
def login():
    content = request.get_json()
    hashpassword = hashlib.md5(content['password'].encode())
    conn = MySQLdb.connect(hostname,username,password,database)
    cur = conn.cursor()
    sql = 'SELECT * FROM user WHERE email= "'+content['email']+'" AND password = "'+hashpassword.hexdigest()+'"'        
    if cur.execute(sql):
        account = cur.fetchone()
        conn.close()
        if account:
            keys=('userId','name','email')
            account=list(account)
            account.pop(3)
            account=tuple(account)
            users={}
            user = dict(zip(keys,account))
            return jsonify({"data":user})
    else:
        return jsonify({"error":"Email or Password is incorrect or User unavailable"})
@app.route('/signup', methods =['POST'])
def signup():
    content = request.get_json()
    conn = MySQLdb.connect(hostname,username,password,database)
    cur = conn.cursor()
    sql = 'SELECT * FROM user WHERE email= "'+content['email']+'"'        
    cur.execute(sql)
    account = cur.fetchone()
    if account:
        return jsonify({"error":"User Already Exist with this email"})
    else:
        hashpassword = hashlib.md5(content['password'].encode())
        cur = conn.cursor()            
        sql = "INSERT INTO user (name, email, password) VALUES ('" + content['name'] + "','" + content['email'] + "','" + hashpassword.hexdigest() +"')"
        cur = conn.cursor()
        if cur.execute(sql):
            conn.commit()
            cur = conn.cursor()
            sql = 'SELECT * FROM user ORDER BY id DESC LIMIT 1'        
            if cur.execute(sql):
                account = cur.fetchone()
                keys=('userId','name','email')
                account=list(account)
                account.pop(3)
                account=tuple(account)
                user={}
                user = dict(zip(keys,account))
                return jsonify({"data":user})
            else:
                return jsonify({"error":"Server error"})
        else:
            return jsonify({"error":"Server error"})
@app.route('/getProducts', methods =['GET'])
def sellproducts():
    conn = MySQLdb.connect(hostname,username,password,database)
    cur = conn.cursor()
    sql = 'SELECT * FROM product WHERE status = 0'        
    if cur.execute(sql):
        productList = cur.fetchall()
        length = len(productList)
        event=[]
        for x in range(length):
            keys=('proId','Pname','Pcategory','Pprice','Propic')
            account=list(productList[x])
            account = account[:5]
            account=tuple(account)
            user={}
            user = dict(zip(keys,account))
            event.append(user)
        return jsonify({"data":event})
    else:
        return jsonify({"error":"No items available"})
@app.route('/getsellProducts/<int:id>', methods =['GET'])
def products(id):
    conn = MySQLdb.connect(hostname,username,password,database)
    cur = conn.cursor()
    sql = 'SELECT * FROM product WHERE status = 0 and seller_id='+str(id)        
    if cur.execute(sql):
        productList = cur.fetchall()
        length = len(productList)
        event=[]
        for x in range(length):
            keys=('proId','Pname','Pcategory','Pprice','Propic')
            account=list(productList[x])
            account = account[:5]
            account=tuple(account)
            user={}
            user = dict(zip(keys,account))
            event.append(user)
        return jsonify({"data":event})
    else:
        return jsonify({"error":"No items available"})

@app.route('/getpurProducts/<int:id>', methods =['GET'])
def purproducts(id):
    conn = MySQLdb.connect(hostname,username,password,database)
    cur = conn.cursor()
    sql = 'SELECT * FROM product WHERE status = 1 and buyer_id='+str(id)        
    if cur.execute(sql):
        productList = cur.fetchall()
        length = len(productList)
        event=[]
        for x in range(length):
            keys=('proId','Pname','Pcategory','Pprice','Propic')
            account=list(productList[x])
            account = account[:5]
            account=tuple(account)
            user={}
            user = dict(zip(keys,account))
            event.append(user)
        return jsonify({"data":event})
    else:
        return jsonify({"error":"No items available"})

@app.route('/sellProduct', methods =['POST'])
def addsell():
    content = request.get_json()
    conn = MySQLdb.connect(hostname,username,password,database)
    cur = conn.cursor()          
    sql = "INSERT INTO product (name, category, price, pic, seller_id, buyer_id, Status) VALUES ('" + content['name'] + "','"+content['category']+"'," + str(content['price']) + ",'" + content['pic'] +"',"+str(content['id'])+","+str(0)+","+str(0)+")"
    print(sql)
    cur = conn.cursor()
    if cur.execute(sql):
        conn.commit()
        return jsonify({"data":"success"})
    else:
        return jsonify({"error":"Server error"})

@app.route('/purchaseProduct', methods =['POST'])
def addpurchase():
    content = request.get_json()
    conn = MySQLdb.connect(hostname,username,password,database)
    cur = conn.cursor()          
    sql = "UPDATE product SET buyer_id ='"+content['id']+"', Status='"+str(1)+"' where pro_id='"+str(content['proId'])+"'"
    cur = conn.cursor()
    if cur.execute(sql):
        conn.commit()
        return jsonify({"data":"success"})
    else:
        return jsonify({"error":"Server error"})

@app.route('/getProducts/<int:id>', methods =['GET'])
def sellproductsid(id):
    conn = MySQLdb.connect(hostname,username,password,database)
    cur = conn.cursor()
    sql = 'SELECT * FROM product WHERE status = 0 and seller_id!='+str(id)        
    if cur.execute(sql):
        productList = cur.fetchall()
        length = len(productList)
        event=[]
        for x in range(length):
            keys=('proId','Pname','Pcategory','Pprice','Propic')
            account=list(productList[x])
            account = account[:5]
            account=tuple(account)
            user={}
            user = dict(zip(keys,account))
            event.append(user)
        return jsonify({"data":event})
    else:
        return jsonify({"error":"No items available"})

@app.route('/getProductdetails/<int:id>', methods =['GET'])
def productdetails(id):
    conn = MySQLdb.connect(hostname,username,password,database)
    cur = conn.cursor()
    sql = 'SELECT * FROM product WHERE pro_id='+str(id)        
    if cur.execute(sql):
        productList = cur.fetchone()
        account=list(productList)
        sql = 'SELECT * FROM user WHERE id='+str(account[5])
        cur.execute(sql)
        seller = cur.fetchone()
        keys=('userId','name','email')
        account1=list(seller)
        account1.pop(3)
        account1=tuple(account1)
        user1={}
        user1 = dict(zip(keys,account1))
        keys=('proId','Pname','Pcategory','Pprice','Propic')
        account = account[:5]
        account=tuple(account)
        user={}
        user = dict(zip(keys,account))
        user['user'] = user1
        # print(user)
        return jsonify({"data":user})
    else:
        return jsonify({"error":"No items available"})

if __name__=='__main__':
	 app.run(debug=True)  