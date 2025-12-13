export function formatTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);
  const months  = Math.floor(days / 30);
  const years   = Math.floor(days / 365);

  const plural = (value, unit) => `${value} ${unit}${value !== 1 ? "s" : ""} ago`;

  if (seconds < 10) return "just now";
  if (seconds < 60) return plural(seconds, "sec");
  if (minutes < 60) return plural(minutes, "min");
  if (hours < 24)   return plural(hours, "hour");
  if (days < 30)    return plural(days, "day");
  if (months < 12)  return plural(months, "month");
  
  // Now years is actually used
  return years === 1 
    ? "1 year ago"
    : date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
}
