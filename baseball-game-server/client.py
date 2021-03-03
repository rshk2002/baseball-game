#client.py
import requests
import random
import json
import logging
import logging.handlers

log = logging.getLogger('snowdeer_log')
log.setLevel(logging.WARNING)

formatter = logging.Formatter('[%(levelname)s] %(funcName)s(line %(lineno)d) > %(message)s')

fileHandler = logging.FileHandler('./log.txt')
streamHandler = logging.StreamHandler()

fileHandler.setFormatter(formatter)
streamHandler.setFormatter(formatter)

log.addHandler(fileHandler)
log.addHandler(streamHandler)

### choose first 3 numbers
def getAllPossibleList():
    possibleList = []
    lengthCount = 0
    for i in range(0,10):
        for j in range(0,10):
            for k in range(0,10):
                if i not in [j, k] and j != k:
                    possibleList.append([i, j, k])
    return possibleList

def getOffenseNum(possibleList):
    n = len(possibleList)
    a = random.randint(0, n-1)
    offenseNum = possibleList[a]
    log.info("offenseNum: " + str(offenseNum))
    return offenseNum

### choose next 3 numbers
def getPossibleList(possibleList, offenseNum, result):
    newPossibleList = []
    result_tmp = []
    log.debug("last offenseNum: " + str(offenseNum))
    log.debug("last result: " + str(result))
    for i in range(0, len(possibleList)):
        result_tmp = judge(offenseNum, possibleList[i]) 
        log.debug("result_tmp: "+ str(result_tmp))
        if result == result_tmp:
            newPossibleList.append(possibleList[i])
            log.debug("newPossibleList: "+ str(newPossibleList))
        else:
            continue
    log.info("가능한 숫자조합의 갯수: " + str(len(newPossibleList)))
    return newPossibleList

### result에 따라 후보 거르기
def judge(offenseNum, candidate): 

    #리스트로 만들기
    offenseNum = json.loads(offenseNum)

    result_tmp = [0, 0, 0]
    for i in range(3):
        for j in range(3):
            if offenseNum[i] == candidate[j]:
                log.debug("offenseNum["+str(i)+"]: "+str(offenseNum[i]))
                log.debug("candidate["+str(j)+"]: "+str(candidate[j]))
                if i==j:
                    result_tmp[0] += 1
                else:
                    result_tmp[1] += 1
                log.debug("result_tmp: " + str(result_tmp))

    result_tmp[2] = 3-result_tmp[0]-result_tmp[1]
    return result_tmp

def playGame():
    URL = 'http://127.0.0.1:5000'
    URL_create = URL + '/create'
    URL_judge = URL + '/judge'

    ### key(uuid) 받기
    key = ""
    response = requests.get(URL_create)
    log.debug(response.json())
    log.debug(response.json()["key"])
    key = response.json()["key"]

    ### 공격숫자와 키를 서버에 보내기
    gameCount = 0
    strike = 0

    while(strike!=3):
        log.debug(str(gameCount+1)+"번째 시도")
        if gameCount<1 :
            possibleList = getAllPossibleList() 
            offenseNum = str(getOffenseNum(possibleList))
        else:
            possibleList = getPossibleList(possibleList, offenseNum, result)
            log.debug(possibleList)
            log.debug(len(possibleList))
            offenseNum = str(getOffenseNum(possibleList))
        
        data = {'key': key, 'offenseNum': offenseNum}
        response = requests.post(url = URL_judge, data = data)
        result = response.json()['result']
        strike = result[0]
        gameCount +=1
        log.debug("gameCount"+str(gameCount))

    print(str(gameCount)+"번 만에 정답을 맞추었습니다.")
    return gameCount

def playGameMultiple():
    total = 0
    for i in range(1000):
        gameCount = playGame()
        total+=gameCount
    print("1000회 플레이 평균: {}".format(total/1000))

def doRun():
    # playGame()
    
    playGameMultiple()
  

if __name__=="__main__":
    doRun()