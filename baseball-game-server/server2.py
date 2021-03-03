# coding: utf-8
from flask import Flask, request, json
from flask_restplus import fields, Resource, Api, namespace
from flask_cors import CORS

import os
import time
import subprocess

import numpy as np
import random
import uuid
import csv
import json
import logging
import logging.handlers 

import stats2

app = Flask(__name__)
app.debug = True
api = Api(app)
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

ns_create = api.namespace('create', description='닉네임 만들기')
ns_judge = api.namespace('judge', description='심판 결과 받기')
ns_stats = api.namespace('stats', description='통계 받기')

offenseNum_model = api.model('offenseNum_model', {
    'offenseNum': fields.String(description='Offense Number', required=True, example='012'),
})

#server에서도 input값 거르기 추가하기
@ns_create.route('/<string:nickname>')
class Create(Resource):
    def post(self, nickname): 
        log.info('/create/nickname/get() start')
        log.info('nickname: ' + nickname)
        uid = str(uuid.uuid4())
        key = nickname + '_' + uid
        defenseNumList = random.sample(range(0,10),3)
        defenseNum = str(defenseNumList[0])+str(defenseNumList[1])+str(defenseNumList[2])
        f = open('../keyfiles/'+ key + '.txt', 'a')
        f.write(nickname + "\n")
        f.write(str(defenseNum))
        f.close()

        return { "key": key , "status": "ok"}

@ns_judge.route('/<string:key>')
class Judge(Resource):
    @api.expect(offenseNum_model)
    def post(self, key):
        # print("request.get_data() : {}".format(request.get_data()))
        # print('/judge/post() start')
        # print(request.__dict__)
        # print(f"request.data : {request.data}")
        # print(f"request.form : {request.form}")
        # print(f"request.json : {request.json}")
        # print(f"request.stream.read() : {request.stream.read()}")
        # print(f"request.get_data() : {request.get_data()}")
        print("[server2.py] key: ", key)
        post_data = request.get_json()
        print("[server2.py] request.get_json():", request.get_json())
        offenseNum = post_data['offenseNum']
        log.info(type(offenseNum)) #<class 'str'>
        

        f = open('../keyfiles/'+ key + '.txt', 'r')
        lines = f.readlines()
        defenseNum = lines[1]
        f.close()

        if offenseNum == '000':
            # 000입력시 정답처리
            result = [3, 0, 0]
            f = open('../keyfiles/'+ key + '.txt', 'a')
            f.write("\n" + defenseNum)
            log.info("000 정답처리")

            return { "key": key, "status": "ok", "result": result }

        else:
            result = [0, 0, 0]
            for i in range(3):
                for j in range(3):
                    if defenseNum[i] == offenseNum[j]:
                        if i == j:
                            result[0] += 1
                        else:
                            result[1] += 1
            f.close()

            result[2] = 3 - result[0] - result[1]

            print("write tryNumber")
            f = open('../keyfiles/'+ key + '.txt', 'a')
            f.write("\n" + offenseNum)

            return { "key": key, "status": "ok", "result": result }

# namespace stats
@ns_stats.route('/all')
class StatsAll(Resource):
    def get(self):
        """
        전체 통계 한번에 받아오기
        서버에서 모든 데이터 한꺼번에 받아올 때 사용
        """
        # stats2.py 실행    
        # exec(open('stats2.py').read())
        # os.system("./run_stats2.sh")
        # stats2.main()

        print(">>> StatsAll get()")
        f = open('statistics.json', 'r', encoding='utf-8')
        data = f.read()
        f.close()
        
        return { "status": "ok", "stats": data, "updateTime": time.ctime(os.path.getmtime('statistics.json'))}

@ns_stats.route('/page/<int:rowFrom>/<int:rowTo>')
class StatsPage(Resource):
    def get(self, rowFrom, rowTo):
        """
        부분 결과 받아오기
        server-driven 방식으로 해당 페이지만 서버에서 가져올 때 사용
        """
        print(">>> StatsPage get()")
        
        f = open('statistics.json', 'r', encoding='utf-8')

        json_data = json.load(f)
        json_array = json_data["data"][rowFrom: rowTo]
        total = len(json_data["data"])

        f.close()
        print("json_data", json_data)
        print("json_array", json_array)
        print("total", total)
        
        return { "status": "ok", "stats": json_array, "updateTime": time.ctime(os.path.getmtime('statistics.json')), "total": total }

if __name__ == '__main__':
    app.run(debug=True)