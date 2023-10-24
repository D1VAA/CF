from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/update', methods=['GET'])
def updateFile():
    import requests
    r = requests.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios/')
    with open('cities.json', 'wb') as f:
       f.write(r.content) 

def CitiesFile():
    cities = open('cities.json', 'rb').readlines()[0]
    citiesList = list()
    for x in json.loads(cities):
        cityName = x['nome']
        cityUF = x['microrregiao']['mesorregiao']['UF']['sigla']
        f_string = f'{cityName}, {cityUF}'
        citiesList.append(f_string)
    return citiesList
l = CitiesFile()

def FilterList(word, listLenght=5):
    try:
        listLenght = int(request.args.get('length'))
    except Exception:
        pass
    filtered = list(filter(lambda x: word.lower() in x.lower(), l))
    return filtered[:listLenght]

if __name__ == '__main__':
    app.run(debug=True, port=9999)