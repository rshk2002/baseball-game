# coding: utf-8
import os

import numpy as np
import pandas as pd
import logging
import logging.handlers

logger = logging.getLogger('snowdeer_log')
logger.setLevel(logging.WARNING)

formatter = logging.Formatter('[%(levelname)s] (%(filename)s: line%(lineno)d) > %(message)s')

fileHandler = logging.FileHandler('./log.txt')
streamHandler = logging.StreamHandler()

fileHandler.setFormatter(formatter)
streamHandler.setFormatter(formatter)

logger.addHandler(fileHandler)
logger.addHandler(streamHandler)

'''
1. 파일명 리스트 만들기
2. 닉네임 리스트 만들기
3. 파일갯수(게임횟수), 게임성공비율, 성공 시 평균 시도 수 등 계산
4. 랭킹계산(df.describe(), df.sort_values(by='B')df.sort_values(by='B'))
5. 랭킹정렬
'''

# key file 리스트 구하기
def get_file_list():
    path_dir = '../keyfiles'
    file_list = os.listdir(path_dir)
    file_list.sort()
    logger.info(file_list)
    return file_list

# 닉네임 리스트 만들기
def get_nickname_list(file_list):
    nickname_list = []
    for key in file_list:
        i = key.index('_')
        nickname = key[0:i]
        nickname_list.append(nickname)
    nickname_list = list(set(nickname_list)) #중복제거
    logger.info(nickname_list)

    return nickname_list

# df값 0으로 초기화하기
def initialize_df(nickname_list):
    data = {'nickname': '', 'gameCnt': 0, 'winCnt': 0, 'winTryCnt': 0, 'tryCntAll': 0 } 
    df = pd.DataFrame(data, index = nickname_list)
    #닉네임 리스트 열을 추가
    s1 = pd.Series(nickname_list, index = nickname_list)
    df['nickname'] = s1

    logger.info('')
    #print(df)
    return df

#파일이름에서 nickname구하기
def get_nickname_from_key(key):
        i = key.index('_')
        nickname = key[:i]
        logger.info('get_nick_from_key(): '+ str(key) + ' | ' + str(nickname))

        return nickname

def column_calc(df):
    # 계산하고 바로 컬럼 추가
    df['winTryAvg'] = df['winTryCnt'] / df['winCnt'] # win시 try 횟수 평균
    df['tryCntAvg'] = df['tryCntAll'] / df['gameCnt'] # try횟수 평균
    df['winRate'] = df['winCnt'] / df['gameCnt'] # win 비율

# 통계 구하기
def get_stats(file_list, nickname_list, df):
    for key in file_list:
        nickname = get_nickname_from_key(key)

        f = open('../keyfiles/'+key, 'r')
        lines = f.readlines()
        f.close()
        logger.info(lines) #type(lines): 리스트
        
        #플레이횟수 더하기
        df.loc[nickname, 'gameCnt'] += 1
        logger.info('gameCnt: ' + str(df.loc[nickname, 'gameCnt']))
        # logger.info('lines[-1]: ' + str(lines[-1]))
        if lines[-1] in lines[1] and len(lines) > 2:
            #성공횟수 +1
            df.loc[nickname, 'winCnt'] += 1
            logger.info('WIN!')
            logger.info('winCnt: ' + str(df.loc[nickname, 'winCnt']))
            #성공시 시도횟수 더하기
            df.loc[nickname, 'winTryCnt'] += len(lines)-2
            logger.info('winTryCnt: ' + str(df.loc[nickname, 'winTryCnt']))
        else:
            logger.info('LOSE!')

        df.loc[nickname, 'tryCntAll'] += len(lines)-2
        logger.info('tryCntAll: ' + str(df.loc[nickname, 'tryCntAll']))
        logger.info('')
    

    # 평균, 비율 등 계산
    column_calc(df)

    return df

#랭킹산정
def get_ranking(df):
    df['gameCnt_rank'] = df['gameCnt'].rank(ascending = False) #제일 많이 플레이한 사람
    df['winCnt_rank'] = df['winCnt'].rank(ascending = False) #제일 많이 정답 맞춘 사람
    df['winTryAvg_rank'] = df['winTryAvg'].rank(ascending = True) #정답을 제일 적은 시도로 맞추는 사람
    df['winRate_rank'] = df['winRate'].rank(ascending = False) #포기하지 않고 정답을 맞추는 비율이 높은 사람
    return df

def main():
    # 통계계산
    file_list = get_file_list()
    nickname_list = get_nickname_list(file_list)
    df = initialize_df(nickname_list)
    df = get_stats(file_list, nickname_list, df)

    # 랭킹산정
    get_ranking(df)
    

    # 랭킹정렬
    df = df.sort_values(by = ["winCnt","winRate" ], ascending=[False,False])
    print(df)
    # 결과 파일로 저장
    df.to_json(r'statistics.json', orient='split')
    # df.to_csv("statistics.csv", mode='w')

if __name__=="__main__":
    main()