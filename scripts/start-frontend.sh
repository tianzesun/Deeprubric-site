#!/bin/bash

# DeepRubric Frontend Startup Script
# This script starts the frontend development server

echo "🚀 Starting DeepRubric Frontend..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Navigate to frontend directory
cd apps/frontend

echo "📦 Installing frontend dependencies..."
# Use pnpm to install dependencies (workspace-aware)
pnpm install || echo "⚠️  Dependency installation had issues, but continuing..."

echo "🌐 Starting frontend development server..."
echo "Frontend will be available at: http://localhost:3000 (or next available port)"
echo "Press Ctrl+C to stop the server"

# Clean any existing lock files that might cause issues
echo "🧹 Cleaning up any existing lock files..."
rm -rf .next/dev 2>/dev/null || true

# Kill any existing Next.js dev servers that might be running
echo "🛑 Checking for existing Next.js dev servers..."
pkill -f "next dev" 2>/dev/null || true
sleep 2  # Give time for processes to terminate

# Start the frontend development server using pnpm
pnpm dev
