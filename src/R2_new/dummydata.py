import random
import json

dummy = []


temp = {"FrameNo" : 1}
temp["Ball"] = {"X":random.choice(list(range(10,1440))), "Y":random.choice(list(range(10,807))) }
temp["Pass"] = {"State" : 0}
for i in range(1,23):
    temp["Player"+str(i)] = {"X":random.choice(list(range(0,1440))), "Y":random.choice(list(range(0,807)))}
dummy.append(temp)
for i in range(1,500):
    temp = {"FrameNo" : i+1}
    temp["Ball"] = {"X":random.choice(list(range(10,1400))), "Y":random.choice(list(range(10,800))) }
    for j in range(1,23):
        temp["Player"+str(j)] = {"X":dummy[i-1]["Player"+str(j)]["X"] +  1, "Y":dummy[i-1]["Player"+str(j)]["Y"] +  1}        
    dummy.append(temp)
    if(random.choice(list(range(50))) == 1):
        temp["Pass"] = {"State" : 1 , "FinalX" :random.choice(list(range(0,1400))) ,"FinalY": random.choice(list(range(0,800)))}
    else :
        temp["Pass"] = {"State" : 0}
with open('dummydata.json', 'w') as f:
    json.dump(dummy,f,indent=4)

        