#!/bin/bash

# Directory containing Markdown files
dir_path="./public/_posts"

# Iterate through all .md files in the directory
find "$dir_path" -type f -name "*.md" | while read -r file_path; do

  # Temporary file for intermediate processing
  temp_file=$(mktemp)

  # Process each line of the file
  while IFS= read -r line; do
    # Look for pattern ![[ ... ]]
    while [[ $line =~ \!\[\[(.+)\]\] ]]; do
      # Extract content inside brackets
      content="${BASH_REMATCH[1]}"

      # Convert to lowercase and replace spaces with hyphens
      formatted_content=$(echo "$content" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

      # Create the new Markdown link format
      replacement="![${formatted_content}](../images/${formatted_content})"

      # Replace the original pattern with the new format
      line="${line/\!\[\[${content}\]\]/${replacement}}"
    done

    # Append the modified line to a temporary file
    echo "$line" >> "$temp_file"
  done < "$file_path"

  # Move the temporary file to the original file
  mv -- "$temp_file" "$file_path"

done
