import fs from "fs";

export function isMarkdown(path: string) {
  if (!fs.existsSync(path)) return false;
  const stats = fs.lstatSync(path);
  if (stats.isFile() && path.split(".")[1] === "md") return true;
  else return false;
}

export function isDir(path: string) {
  if (!fs.existsSync(path)) return false;
  const stats = fs.lstatSync(path);
  return stats.isDirectory();
}

export function getFileTimeInfo(path: string) {
  return {
    createAt: fs.lstatSync(path).birthtime,
    lastModifiedAt: fs.lstatSync(path).mtime,
  };
}
