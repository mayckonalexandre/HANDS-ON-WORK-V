import path from "path";
import fs from "fs";
import moment from "moment";

export function CreateLogPath() {
  const logPath = path.join(__dirname, "./../logs");
  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
  }

  const logFileName = `express${moment().format("YYYY-MM-DD")}.log`;
  const logFilePath = path.join(logPath, logFileName);
  const logStream = fs.createWriteStream(logFilePath, { flags: "a" });
  return logStream;
}