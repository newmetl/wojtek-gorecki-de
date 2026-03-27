import fs from "fs";
import path from "path";

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "agent.log");

export function logAgentAction(
  resource: string,
  action: string,
  resourceId: string,
  resourceTitle: string,
  responseStatus: number
) {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }

  const entry = {
    timestamp: new Date().toISOString(),
    resource,
    action,
    resourceId,
    resourceTitle,
    responseStatus,
  };

  fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + "\n", "utf-8");
}
