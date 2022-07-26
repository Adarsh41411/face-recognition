
'''

creating datasets of 30 faces of individual man in which 25 images in train folder and 5 in test folder using MTCNN (to detect faces) .....

'''

import cv2
import os
cam = cv2.VideoCapture(0)
from mtcnn import MTCNN
face_id = input("enter name with their id // name_id:  ==>  ")
try:
    os.mkdir("datasets")
except:
    pass
try:
    os.mkdir("datasets/train")
    os.mkdir("datasets/test")
except:
    pass
try:
    os.mkdir("datasets/train/"+face_id)
    os.mkdir("datasets/test/"+ face_id)
except:
    pass


detector = MTCNN()

print("\n [INFO] Initializing face capture. look at the camera and wait ... ")

count = 0

while (True):
    ret,img = cam.read()
    #gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    faces = detector.detect_faces(img)
    print(faces)
    if faces != []:
        for person in faces:
            bounding_box = person['box']
    
            cv2.rectangle(img,(bounding_box[0],bounding_box[1]), (bounding_box[0]+bounding_box[2],bounding_box[1]+bounding_box[3]),(255,0,0),2)
            count += 1
            if count <= 25:
                cv2.imwrite("datasets/train/" + str(face_id) + "/" + str(count) + ".jpg", img[bounding_box[1]:bounding_box[1]+bounding_box[3],bounding_box[0]:bounding_box[0]+bounding_box[2]])
            else:
                cv2.imwrite("datasets/test/" + str(face_id)  + "/" + str(count) + ".jpg", img[bounding_box[1]:bounding_box[1]+bounding_box[3],bounding_box[0]:bounding_box[0]+bounding_box[2]])

            cv2.imshow("image", img)
        
    k = cv2.waitKey(100) & 0xff
    if k == 22:
        break
    elif count >= 30:
        break
print("[INFO] closing camera and quiting program" )

cam.release()
cv2.destroyAllWindows()
