#!/bin/bash


# Install backend dependencies
pip install -r backend/requirements.txt

# Install frontend dependencies and build
npm install --prefix frontend
(cd frontend && REACT_APP_API_URL=http://web-env-v2-env.eba-jb352ukt.ap-south-1.elasticbeanstalk.com/ npm run build)
