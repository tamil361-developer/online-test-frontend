#!/bin/bash
# Build script for React/Vite frontend on Render

# Exit on error
set -o errexit

# Install dependencies
npm install

# Build the app
npm run build
