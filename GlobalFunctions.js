Number.prototype.toMulti = function() {
    return this / 100 + 1;
};

window.getLevelPercentage = function(currentLevel, maxLevel) {
  if (maxLevel <= 0) return 0;           // prevent division by zero

  const percentage = (currentLevel / maxLevel) * 100;
  
  // Clamp between 0 and 100
  return Math.max(0, Math.min(100, percentage));
}