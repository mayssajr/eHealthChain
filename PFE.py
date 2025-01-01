import cv2
import board
import busio as io
import adafruit_mlx90614
from time import sleep
import json
from web3 import Web3

# Chargement du fichier XML du cascadeur de détection de visage
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# Capture d'image depuis la caméra
camera = cv2.VideoCapture(0)

i2c = io.I2C(board.SCL, board.SDA, frequency=100000)
mlx = adafruit_mlx90614.MLX90614(i2c)

truffle_file = json.load(open('/home/pi/authentification (1).json'))

abi = truffle_file['abi']

web3 = Web3(Web3.HTTPProvider('http://192.168.1.222:9545/'))

contract = web3.eth.contract(address='0x393D9FAe3F57132eA3079303f93504eeaABCa50B', abi=abi)

while True:
    # Lecture de l'image depuis la caméra
    ret, frame = camera.read()

    # Conversion en niveaux de gris pour la détection de visage
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Détection des visages
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    # Encadrement des visages détectés avec un rectangle
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)

        # Récupération du visage détecté
        face_roi = frame[y:y+h, x:x+w]

        # Conversion de l'image du visage en niveaux de gris pour la détection de Mayssa
        gray_face = cv2.cvtColor(face_roi, cv2.COLOR_BGR2GRAY)

        # Détection de Mayssa
        mayssa_faces = face_cascade.detectMultiScale(gray_face, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        # Si le visage de Mayssa est détecté, envoyer son nom et sa température à la blockchain
        if len(mayssa_faces) > 0:
            target_temp = int(mlx.object_temperature)

            # Envoi du nom et de la température à la blockchain
            contract.functions.addTemperature(target_temp, 'Mayssa').transact({'from': '0x1ab519b52DD71911C22E2277F14dB910B5B28CDd'})

            print("Nom: Mayssa")
            print("Température du patient:", target_temp, "°C")

    # Affichage de l'image avec les visages encadrés
    cv2.imshow('Face Detection', frame)

    # Sortir de la boucle si la touche 'q' est pressée
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Libération des ressources
camera.release()
cv2.destroyAllWindows()
