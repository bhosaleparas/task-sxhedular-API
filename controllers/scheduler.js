const { validateProcesses } = require('../utils/validators');

// Process model
class Process {
  constructor(pid, arrivalTime, burstTime, priority) {
    this.pid = pid;
    this.arrivalTime = arrivalTime;
    this.burstTime = burstTime;
    this.priority = priority;
    this.remainingTime = burstTime;
    this.waitingTime = 0;
    this.turnaroundTime = 0;
    this.startTime = 0;
    this.finishTime = 0;
  }
}

// Validate input middleware
const validateProcessInput = (req, res, next) => {
  const { processes, algorithm, timeQuantum } = req.body;
  
  try {
    validateProcesses(processes);
    
    if (!['RR', 'SJF', 'Priority'].includes(algorithm)) {
      throw new Error('Invalid algorithm specified. Use RR, SJF, or Priority.');
    }
    
    if (algorithm === 'RR' && (!timeQuantum || timeQuantum <= 0)) {
      throw new Error('Time quantum is required for Round Robin and must be positive.');
    }
    
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Main scheduling function
const scheduleProcesses = (req, res) => {
  const { processes: processData, algorithm, timeQuantum } = req.body;
  
  try {
    // Create Process objects
    const processes = processData.map(p => new Process(
      p.pid,
      p.arrivalTime,
      p.burstTime,
      p.priority || 0
    ));
    
    let result;
    switch (algorithm) {
      case 'RR':
        result = roundRobinScheduling([...processes], timeQuantum);
        break;
      case 'SJF':
        result = sjfScheduling([...processes]);
        break;
      case 'Priority':
        result = priorityScheduling([...processes]);
        break;
    }
    
    res.json({
      success: true,
      algorithm,
      timeQuantum: algorithm === 'RR' ? timeQuantum : undefined,
      ...result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Round Robin Scheduling Algorithm
function roundRobinScheduling(processes, timeQuantum) {
  let currentTime = 0;
  const readyQueue = [];
  const completedProcesses = [];
  const executionOrder = [];
  
  // Sort processes by arrival time
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
  
  while (processes.length > 0 || readyQueue.length > 0) {
    // Add arrived processes to ready queue
    while (processes.length > 0 && processes[0].arrivalTime <= currentTime) {
      readyQueue.push(processes.shift());
    }
    
    if (readyQueue.length === 0) {
      currentTime = processes[0].arrivalTime;
      continue;
    }
    
    const currentProcess = readyQueue.shift();
    executionOrder.push(currentProcess.pid);
    
    const executionTime = Math.min(timeQuantum, currentProcess.remainingTime);
    
    if (currentProcess.remainingTime === currentProcess.burstTime) {
      currentProcess.startTime = currentTime;
    }
    
    currentTime += executionTime;
    currentProcess.remainingTime -= executionTime;
    
    // Add arrived processes during this execution
    while (processes.length > 0 && processes[0].arrivalTime <= currentTime) {
      readyQueue.push(processes.shift());
    }
    
    if (currentProcess.remainingTime > 0) {
      readyQueue.push(currentProcess);
    } else {
      currentProcess.finishTime = currentTime;
      currentProcess.turnaroundTime = currentProcess.finishTime - currentProcess.arrivalTime;
      currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime;
      completedProcesses.push(currentProcess);
    }
  }
  
  return formatResults(completedProcesses, executionOrder);
}

// Shortest Job First Scheduling Algorithm
function sjfScheduling(processes) {
  let currentTime = 0;
  const completedProcesses = [];
  const executionOrder = [];
  
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
  
  while (processes.length > 0) {
    // Get arrived processes
    const arrivedProcesses = processes.filter(p => p.arrivalTime <= currentTime);
    
    if (arrivedProcesses.length === 0) {
      currentTime = processes[0].arrivalTime;
      continue;
    }
    
    // Sort by burst time
    arrivedProcesses.sort((a, b) => a.burstTime - b.burstTime);
    const currentProcess = arrivedProcesses[0];
    
    // Remove from original array
    const index = processes.findIndex(p => p.pid === currentProcess.pid);
    processes.splice(index, 1);
    
    executionOrder.push(currentProcess.pid);
    currentProcess.startTime = currentTime;
    currentTime += currentProcess.burstTime;
    currentProcess.finishTime = currentTime;
    currentProcess.turnaroundTime = currentProcess.finishTime - currentProcess.arrivalTime;
    currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime;
    completedProcesses.push(currentProcess);
  }
  
  return formatResults(completedProcesses, executionOrder);
}

// Priority Scheduling Algorithm (lower number = higher priority)
function priorityScheduling(processes) {
  let currentTime = 0;
  const completedProcesses = [];
  const executionOrder = [];
  
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
  
  while (processes.length > 0) {
    // Get arrived processes
    const arrivedProcesses = processes.filter(p => p.arrivalTime <= currentTime);
    
    if (arrivedProcesses.length === 0) {
      currentTime = processes[0].arrivalTime;
      continue;
    }
    
    // Sort by priority
    arrivedProcesses.sort((a, b) => a.priority - b.priority);
    const currentProcess = arrivedProcesses[0];
    
    // Remove from original array
    const index = processes.findIndex(p => p.pid === currentProcess.pid);
    processes.splice(index, 1);
    
    executionOrder.push(currentProcess.pid);
    currentProcess.startTime = currentTime;
    currentTime += currentProcess.burstTime;
    currentProcess.finishTime = currentTime;
    currentProcess.turnaroundTime = currentProcess.finishTime - currentProcess.arrivalTime;
    currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime;
    completedProcesses.push(currentProcess);
  }
  
  return formatResults(completedProcesses, executionOrder);
}

// Format results for response
function formatResults(processes, executionOrder) {
  const totalProcesses = processes.length;
  const avgWaitingTime = processes.reduce((sum, p) => sum + p.waitingTime, 0) / totalProcesses;
  const avgTurnaroundTime = processes.reduce((sum, p) => sum + p.turnaroundTime, 0) / totalProcesses;
  
  return {
    processes: processes.map(p => ({
      pid: p.pid,
      arrivalTime: p.arrivalTime,
      burstTime: p.burstTime,
      priority: p.priority,
      waitingTime: p.waitingTime,
      turnaroundTime: p.turnaroundTime,
      startTime: p.startTime,
      finishTime: p.finishTime
    })),
    executionOrder,
    averageWaitingTime: parseFloat(avgWaitingTime.toFixed(2)),
    averageTurnaroundTime: parseFloat(avgTurnaroundTime.toFixed(2))
  };
}

module.exports = {
  scheduleProcesses,
  validateProcessInput
};