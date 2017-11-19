#!C:\Users\sankalp mahale\AppData\Local\Programs\Python\Python36-32\python.exe

import os

if('APPDATA' in os.environ):
    print("Appdata present")
    print(os.environ['APPDATA'])
else:
    # print("Appdata NOT present :'(")
    os.environ['APPDATA'] ='C:\\Users\\sankalp mahale\\AppData\\Roaming'

from stemming.porter2 import stem
from nltk import sent_tokenize
from nltk import word_tokenize
import re
from nltk.stem.snowball import SnowballStemmer
import MySQLdb
from nltk.corpus import stopwords
from collections import Counter
import math
import operator
import sys, json

# print(sys.argv[2])

stemmer = SnowballStemmer("english")
stopwords = stopwords.words('english')

stopwords = []
with open('stopwords.txt') as f:
    for line in f:
        stopwords.append(line.strip())

# print(stopwords)

def tokenize_and_stem(text):
   
    tokens = [word for sent in sent_tokenize(text) for word in word_tokenize(sent)]
    filtered_tokens = []
    
    for token in tokens:
        if re.search('[a-zA-Z]', token):
            filtered_tokens.append(token)
    stems = [stem(t) for t in filtered_tokens]
    return stems

def stem_and_remove_stopwords(document):
    stemmed_tokens =  tokenize_and_stem(document)
    cleaned_doc = [w for w in stemmed_tokens if not w in stopwords]
    return cleaned_doc
	
def counter_cosine_similarity(c1, c2):
    terms = set(c1).union(c2)
    dotprod = sum(c1.get(k, 0) * c2.get(k, 0) for k in terms)
    magA = math.sqrt(sum(c1.get(k, 0)**2 for k in terms))
    magB = math.sqrt(sum(c2.get(k, 0)**2 for k in terms))
    if((magA * magB)==0):
        return 0
    return dotprod / (magA * magB)

database = MySQLdb.connect(host='localhost',user='root',passwd="",db="qrstore")


# pid = sys.argv[1]
pname = sys.argv[1]
cur = database.cursor(MySQLdb.cursors.DictCursor)
cur.execute("Select * from products where pname='"+str(pname)+"'")

chosen_product_desc = []
for row in cur.fetchall():
    chosen_product_desc.append(stem_and_remove_stopwords(row['description']))

# chosen_product_desc = stem_and_remove_stopwords(chosen_product_desc)
# for i in range(len(chosen_product_desc)):
#     chosen_product_desc[i] = stem_and_remove_stopwords(chosen_product_desc[i])


product_descriptions = []

i=0
for desc in chosen_product_desc:

    cur.execute("Select * from products where pname!='"+str(pname)+"'")


    product_descriptions.append({})

    for row in cur.fetchall():
        product_descriptions[i][row['pid']]= row['description']


    for k in product_descriptions[i]:
        description = stem_and_remove_stopwords(product_descriptions[i][k])
        product_descriptions[i][k] = description



    chosen_doc = Counter(desc)


    for k in product_descriptions[i]:
        diff_doc = Counter(product_descriptions[i][k])
        product_descriptions[i][k] = counter_cosine_similarity(chosen_doc,diff_doc)

    # similarities.append(sorted(product_descriptions[i].items(), key=operator.itemgetter(1),reverse=True))
    i = i+1

similarities = {}

for k in product_descriptions[0]:
    similarities[k] = 0
    for i in  range(len(product_descriptions)):
        similarities[k] = similarities[k] + product_descriptions[i][k]

for k in product_descriptions[0]:
     similarities[k] =  similarities[k] / len(product_descriptions)

similarities = sorted(similarities.items(), key=operator.itemgetter(1),reverse=True)
# print(similarities)
count = min(2,len(similarities))

response = {'count':count,'products':[]}

for i in range(count):
    cur.execute("Select * from products where pid="+str(similarities[i][0]))
    for row in cur.fetchall():
        response['products'].append(json.dumps({'products':row['pname'],'pid':similarities[i][0]}))

print(json.dumps(response))