function validateProcesses(processes) {
  if (!Array.isArray(processes) || processes.length === 0) {
    throw new Error('Processes must be a non-empty array');
  }

  for (const process of processes) {
    if (!process.pid) {
      throw new Error('Each process must have a PID');
    }
    if (typeof process.arrivalTime !== 'number' || process.arrivalTime < 0) {
      throw new Error('Arrival time must be a non-negative number');
    }
    if (typeof process.burstTime !== 'number' || process.burstTime <= 0) {
      throw new Error('Burst time must be a positive number');
    }
    if (process.priority !== undefined && (typeof process.priority !== 'number' || process.priority < 0)) {
      throw new Error('Priority must be a non-negative number if provided');
    }
  }

  // Check for duplicate PIDs
  const pids = processes.map(p => p.pid);
  if (new Set(pids).size !== pids.length) {
    throw new Error('Duplicate PIDs are not allowed');
  }
}

module.exports = {
  validateProcesses
};