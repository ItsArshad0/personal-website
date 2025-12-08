#!/bin/bash


# Install backend dependencies
pip install -r backend/requirements.txt

# Install frontend dependencies and build
npm install --prefix frontend
npm run build --prefix frontend
