#!/bin/bash

# Build script to generate resume.pdf from Myresume.tex
echo "Building resume.pdf from Myresume.tex..."

# Compile LaTeX file
pdflatex -interaction=nonstopmode Myresume.tex

# Check if compilation was successful
if [ $? -eq 0 ]; then
    # Rename the output file to resume.pdf
    if [ -f "Myresume.pdf" ]; then
        mv Myresume.pdf resume.pdf
        echo "✅ Successfully generated resume.pdf"
    else
        echo "❌ Error: Myresume.pdf was not generated"
        exit 1
    fi
    
    # Clean up auxiliary files
    rm -f Myresume.aux Myresume.log Myresume.out
    echo "🧹 Cleaned up auxiliary files"
else
    echo "❌ LaTeX compilation failed"
    exit 1
fi
