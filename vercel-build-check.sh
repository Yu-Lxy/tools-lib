#!/bin/bash
echo "Current branch: $VERCEL_GIT_COMMIT_REF"

if [ "$VERCEL_GIT_COMMIT_REF" = "main" ] || [ "$VERCEL_GIT_COMMIT_REF" = "test" ]; then
  echo "✅ - Proceeding with build"
  exit 1
else
  echo "🛑 - Skipping build - not main or test branch"
  exit 0
fi