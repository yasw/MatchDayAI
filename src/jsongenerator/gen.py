 

"""
import json 


# Save a python dict object to JSON format file.
def python_dict_to_json_file(file_path):
    try:
        # Get a file object with write permission.
        file_object = open(file_path, 'w')

        dict_object = dict(name='tim', age=25, score=100)

        # Save dict data into the JSON file.
        json.dump(dict_object, file_object)

        print(file_path + " created. ")    
    except FileNotFoundError:
        print(file_path + " not found. ")    

if __name__ == '__main__':
    python_dict_to_json_file("./playerme.json")
	


  
import json 
  
  
# function to add to JSON 
def write_json(data, filename='./data.json'): 
    with open(filename,'w') as f: 
        json.dump(data, f, indent=4) 
      
      
with open('./data.json') as json_file: 
    data = json.load(json_file) 
      
    temp = data['emp_details'] 
  
    # python object to be appended 
    y = {"emp_name":'Nikhil', 
         "email": "nikhil@geeksforgeeks.org", 
         "job_profile": "Full Time"
        } 
  
  
    # appending data to emp_details  
    temp.append(y) 
      
write_json(data) 
"""  
"""
import json
# function to add to JSON 
def write_json(data, filename='./data.json'): 
    with open(filename,'w') as f: 
        json.dump(data, f, indent=4) 
        
with open('./data.json') as json_file:

    data = json.load(json_file) 
      
    temp = data['emp_details']
    
    
  
    # python object to be appended 
    for i in range (1,3):
        y = {"frame_number":i,
             "team1":{
                        "x1":"10",
                        "y1":"1",
                        
                        "x2":"10",
                        "y2":"10",
                        
                        
                        "x3":"10",
                        "y3":"20",
                        
                        
                        "x4":"10",
                        "y4":"20",
                        
                        
                        "x5":"10",
                        "y5":"50",
                        
                        
                        "x6":"10",
                        "y6":"60",
                        
                        
                        "x7":"10",
                        "y7":"70",
                        
                        
                        "x8":"10",
                        "y8":"80",
                        
                        "x9":"10",
                        "y9":"90",
                        
                        "x10":"10",
                        "y10":"100",
                        
                        
                        "x11":"10",
                        "y11":"110"
                     },
             
             "team2":{
                        "x1":"400",
                        "y1":"1",
                        
                        "x2":"400",
                        "y2":"10",
                        
                        
                        "x3":"400",
                        "y3":"20",
                        
                        
                        "x4":"400",
                        "y4":"20",
                        
                        
                        "x5":"400",
                        "y5":"50",
                        
                        
                        "x6":"400",
                        "y6":"60",
                        
                        
                        "x7":"400",
                        "y7":"70",
                        
                        
                        "x8":"400",
                        "y8":"80",
                        
                        "x9":"400",
                        "y9":"90",
                        
                        "x10":"400",
                        "y10":"100",
                        
                        
                        "x11":"400",
                        "y11":"110"
                     }
    		
            }
             
        print(y)
        temp.append(y)
        write_json(data)
        
        
    
    
#write_json(data)  
"""
    
import json
import random
# function to add to JSON 
def write_json(data, filename='./data.json'): 
    with open(filename,'w') as f: 
        json.dump(data, f, indent=4) 
        
with open('./data.json') as json_file:

    data = json.load(json_file) 
      
    temp = []
    ch=10
    ch1=400
  
    # python object to be appended 
    for i in range (1,300):
        ch=random.choice(list(range(1,1000)))
        ch1=random.choice(list(range(900,1900)))
        y = {"frame_number":i,
             
                        "x1":str(random.choice(list(range(1,1000)))),
                        "y1":str(random.choice(list(range(1,900)))),
                        
                        "x2":str(random.choice(list(range(1,1000)))),
                        "y2":str(random.choice(list(range(1,900)))),
                        
                        
                        "x3":str(random.choice(list(range(1,1000)))),
                        "y3":str(random.choice(list(range(1,900)))),
                        
                        
                        "x4":str(random.choice(list(range(1,1000)))),
                        "y4":str(random.choice(list(range(1,900)))),
                        
                        
                        "x5":str(random.choice(list(range(1,1000)))),
                        "y5":str(random.choice(list(range(1,900)))),
                        
                        
                        "x6":str(random.choice(list(range(1,1000)))),
                        "y6":str(random.choice(list(range(1,900)))),
                        
                        
                        "x7":str(random.choice(list(range(1,1000)))),
                        "y7":str(random.choice(list(range(1,900)))),
                        
                        
                        "x8":str(random.choice(list(range(1,1000)))),
                        "y8":str(random.choice(list(range(1,900)))),
                        
                        "x9":str(random.choice(list(range(1,1000)))),
                        "y9":str(random.choice(list(range(1,900)))),
                        
                        "x10":str(random.choice(list(range(1,1000)))),
                        "y10":str(random.choice(list(range(1,900)))),
                        
                        
                        "x11":str(random.choice(list(range(1,1000)))),
                        "y11":str(random.choice(list(range(1,900)))),
             
                        "x12":str(random.choice(list(range(900,1900)))),
                        "y12":str(random.choice(list(range(1,900)))),
                        

                        
                        "x13":str(random.choice(list(range(900,1900)))),
                        "y13":str(random.choice(list(range(1,900)))),
                        
                        
                        "x14":str(random.choice(list(range(900,1900)))),
                        "y14":str(random.choice(list(range(1,900)))),
                        
                        
                        "x15":str(random.choice(list(range(900,1900)))),
                        "y15":str(random.choice(list(range(1,900)))),
                        
                        
                        "x16":str(random.choice(list(range(900,1900)))),
                        "y16":str(random.choice(list(range(1,900)))),
                        
                        
                        "x17":str(random.choice(list(range(900,1900)))),
                        "y17":str(random.choice(list(range(1,900)))),
                        
                        
                        "x18":str(random.choice(list(range(900,1900)))),
                        "y18":str(random.choice(list(range(1,900)))),
                        
                        "x19":str(random.choice(list(range(900,1900)))),
                        "y19":str(random.choice(list(range(1,900)))),
                        
                        "x20":str(random.choice(list(range(900,1900)))),
                        "y20":str(random.choice(list(range(1,900)))),
                        
                        
                        "x21":str(random.choice(list(range(900,1900)))),
                        "y21":str(random.choice(list(range(1,900)))),


                        "x22":str(random.choice(list(range(900,1900)))),
                        "y22":str(random.choice(list(range(1,900)))),

                        "ballx":str(random.choice(list(range(1,900)))),
                        "bally":str(random.choice(list(range(1,900)))),
                        
                     }
    		
            
             
        print(y)
        temp.append(y)
        write_json(temp)
