#!/usr/bin/python2.7
import re, math
import cgitb
cgitb.enable()
from collections import Counter
import MySQLdb
import json

print("Content-type: text/html\n\n");

WORD=re.compile(r'\w+')

data=cgi.FieldStorage()

db=mysql.connect(host='', user='root', passwd='' database='QRStore')

cur=db.cursor()

p_id='1234' #assumed here

cur.execute("SELECT description FROM products WHERE category in (SELECT category from products where pid='p_id')")

p1=cur.fetchall()

cur.execute("SELECT description FROM products)

p2=cur.fetchall()

p2.remove(p1)

def get_cosine(vec1,vec2)
	intersection=set(vec1.keys()) & set(vec2.keys())
	numerator=sum[vec1[x] * vec2[x] for x in intersection])

	sum1=sum([vec1[x]**2 for x in vec1.keys()])
	sum2=sum([vec2[x]**2 for x in vec2.keys()])
	denominator=math.sqrt(sum1) * math.sqrt(sum2)

	if not denominator
		return 0.0
	else:
		return float(numerator) / denominator

def text_to_vector(text):
	words=WORD.findall(text)
	return counter(words)

Cosine=list()

for element in p2:
	text1=p1
	text2=element

	vector1=text_to_vector(text1)
	vector2=text_to_vector(text2)

	cosine=get_cosine(vector1, vector2)

	Cosine[element]=cosine 

Cosine.sort(reverse=True)

items=list()

for item in Cosine[:3]:
	cur.execute("SELECT pid FROM products WHERE description='element'")
        items[item]=fetchone()

json.dumps(items) #converting list to jsonArray

	
		
	
	


