# coding: utf-8

from flask import Flask, jsonify, request, json
from flask_cors import CORS
import random
import uuid
import logging
import logging.handlers
import json

app = Flask(__name__)
CORS(app)

log = logging.getLogger('snowdeer_log')
log.setLevel(logging.INFO)

formatter = logging.Formatter('[%(levelname)s] (%(filename)s: line%(lineno)d) > %(message)s')

fileHandler = logging.FileHandler('./log.txt')
streamHandler = logging.StreamHandler()

fileHandler.setFormatter(formatter)
streamHandler.setFormatter(formatter)

log.addHandler(fileHandler)
log.addHandler(streamHandler)

@app.route('/')
@app.route('/create')
def create():
    log.info('CREATE()')
    defenseNum=[]
    lengthCount = 0
    gameCount = 0
    
    defenseNum = random.sample(range(0,10),3) #수비숫자 3개 랜덤으로 고르기
    log.info("defenseNum: " + str(defenseNum))
    
    u = uuid.uuid4()
    f = open('../keyfiles/'+str(u)+'.txt', 'a')
    f.write(str(defenseNum))

    return jsonify(key=str(u), status="ok") #json형태의 string으로 리턴


@app.route('/judge', methods=['POST'])
def judge():
    log.info('JUDGE()')
    print(request)
    post_data = request.get_json()
    log.info(post_data)
    uuid = post_data['key']
    offenseNum = post_data['offenseNum']

    log.info(type(uuid)) #str
    # log.info("offenseNum: " + str(offenseNum))
    log.info('type of offenseNum:',type(offenseNum))
        
    f = open('../keyfiles/'+str(uuid)+'.txt', 'r')
    defenseNum = f.read()
    f.close()

    defenseNum = json.loads(defenseNum)


    log.info("type of defenseNum:", type(defenseNum))
    # log.info("type of offenseNum:", type(offenseNum))
    log.info("str(defenseNum): " + str(defenseNum))
    log.info("str(offenseNum):" + str(offenseNum))

    result = [0, 0, 0]
    for i in range(3):
        for j in range(3):
            if defenseNum[i] == offenseNum[j]:
                if i==j:
                    result[0] += 1
                else:
                    result[1] += 1
    result[2] = 3-result[0]-result[1]
    # log.info(result)

    return jsonify(key=str(uuid), status="ok", result = result)


if __name__ == '__main__':
    app.run()