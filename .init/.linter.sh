#!/bin/bash
cd /home/kavia/workspace/code-generation/workflow-builder-platform-127272-127281/user_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

