from flask import Flask, render_template, request, g, jsonify
import requests
import sqlite3
import numpy
import cv2
import os
import json
import numpy as np
import io
import sys

app = Flask(__name__, static_url_path='/static')
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)