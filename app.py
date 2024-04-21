from flask import Flask, request, jsonify
import pymongo
from moviepy.editor import VideoFileClip
from flask_cors import CORS
import speech_recognition as sr
from pydub import AudioSegment
import google.generativeai as genai
import json

app = Flask(__name__)
recognizer = sr.Recognizer()
CORS(app, origins="*")

client = pymongo.MongoClient("mongodb://localhost:27017")
db = client["EdTech"]
users = db["users"]

@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'success':False ,'message': 'Api error'}), 200

    user = users.find_one({'email': email})
    print(user)
    if not user: return jsonify({'success': False ,'message': 'email not registered'}), 200
    else:
        if user['password'] == password: return jsonify({'name':user['name'],'success': True ,'message': 'login details verified successfully'}), 200
        else: jsonify({'success': False, 'message': 'incorrect password'}), 200


@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'success':False ,'message': 'Api error'}), 200

    user = users.find_one({'email': email})
    print(user)
    if user: return jsonify({'success': False ,'message': 'email already registered'}), 200
    else:
        users.insert_one({'name':name, 'password':password, 'email':email})
        return jsonify({'success': True ,'message': 'email registered successfully'}), 200

qdata=[]
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'video' not in request.files:
        return jsonify({'success': False ,'message': 'Video not available'}), 400
    file = request.files['video']
    if file.filename == '':
        return jsonify({'success': False ,'message': 'Video not available'}), 400
    print(file)

    video_temp_path = 'temp_video.mp4'
    file.save(video_temp_path)
    audio_clip = VideoFileClip(video_temp_path).audio
    audio_temp_path = 'temp_audio.wav'
    audio_clip.write_audiofile(audio_temp_path)

    # Path to the large audio file
    audio = AudioSegment.from_file(audio_temp_path)
    
    chunk_size_ms = 30000 # 10 seconds
    arr = []
    questions = []
    for i, chunk in enumerate(audio[::chunk_size_ms]):
        # Export each chunk to a temporary WAV file
        chunk.export(f"temp_chunk_{0}.wav", format="wav")

        with sr.AudioFile(f"temp_chunk_{0}.wav") as source:
            audio_data = recognizer.record(source)
            try:
                text = recognizer.recognize_google(audio_data)
                print(text)
                arr.append(text)
            except sr.UnknownValueError:
                print("Could not understand audio")
            except sr.RequestError as e:
                print("Could not request results; {0}".format(e))

        genai.configure(api_key="AIzaSyBMb-6ApehenDu0iVJ8BXXRZ-HjnNM1hIc")
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(text + 'Give me 1 question with 4 options among which 1 is correct in json array format like "question",another array of options in it which has keys "a","b","c" and "d" and then provide the correct option.')
        questions.append(json.loads(response.candidates[0].content.parts[0].text))
        if len(questions) >= 4: break
        print(response.candidates[0].content.parts[0].text)

    # genai.configure(api_key="AIzaSyBMb-6ApehenDu0iVJ8BXXRZ-HjnNM1hIc")
    # model = genai.GenerativeModel('gemini-pro')
    # response = model.generate_content(text + 'Give me 20 questions in a json array format which has one key for question and correct_option then one last key for options array in it which has options like "a","b","c","d"')
    # questions.append(response.candidates[0].content.parts[0].text)
    
    qdata.append(json.loads(questions))
    print(qdata)
    return jsonify({'success': True ,'message': 'Video Accepted', 'qdata': qdata}), 200
    

if __name__ == '__main__':
    app.run(debug=True, host="localhost", port=4005)