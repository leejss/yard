#!/bin/bash

# Directory to process
dir_path="./public/images/"

# Use 'find' to loop over all files in the directory and its subdirectories
find "$dir_path" -type f | while read -r old_file; do
    # Create new filename by replacing spaces with underscores
    new_file="${old_file// /-}"

    new_file=$(echo "$new_file" | tr '[:upper:]' '[:lower:]')

    # If old and new filenames are different, then rename
    if [ "$old_file" != "$new_file" ]; then
        mv -v -- "$old_file" "$new_file"
    fi
done
