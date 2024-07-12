from flask import Flask, request, render_template, redirect, url_for, flash
import os
import logging
import random
from hashlib import sha256
from secret import a,c,m

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

FLAG = os.environ.get('FLAG', 'flag{fake_flag_for_testing}')

app = Flask(__name__)
app.secret_key = os.urandom(24)

assert m == 999983
seed = random.randint(0,m) 
current_auth_code = seed

def lcg():
    global current_auth_code
    current_auth_code = (a * current_auth_code + c) % m
    return current_auth_code

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    global current_auth_code
    logger.info(f'Login attempt: {current_auth_code}')
    username = request.form['username']
    auth_code = request.form['auth_code']
    
    expected_auth_code = lcg()

    if (sha256(username.encode()).hexdigest() == '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918' 
        and str(expected_auth_code) == auth_code):
        flash('Login successful. Have a flag!\n{}!'.format(FLAG), 'success')
        return redirect(url_for('home'))
    else:
        # If auth code is incorrect, inform the user of the correct expected code
        flash('Incorrect auth code. Expected: {}'.format(expected_auth_code), 'error')
        return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
