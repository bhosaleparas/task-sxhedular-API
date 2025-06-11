# 🚀 Task Scheduler API

## ✨ Features

### 🧠 Multiple Scheduling Algorithms

* ⏳ **Round Robin (RR)**
* 🏆 **Priority Scheduling**
* ⚡ **Shortest Job First (SJF)**

### 📊 Comprehensive Metrics

* 📈 **Execution order visualization**
* 📌 **Individual process metrics**

  * Waiting time
  * Turnaround time
* 📉 **System-wide averages**

### 👨‍💻 Developer Friendly

* 🧩 **RESTful API design**
* 🛠️ **Detailed error messages**
* ✅ **Input validation**
* 📦 **Consistent response format**

---

## 🏁 Getting Started

### ✅ Prerequisites

* [Node.js](https://nodejs.org/) `v18.x`
* `npm` or `yarn`

---

### 📥 Installation

**Clone the repository:**

```bash
git clone https://github.com/yourusername/task-scheduler.git
cd task-scheduler
```

**Install dependencies:**

```bash
npm install
```

**Start the server:**

```bash
npm start
# or for development
npm run dev
```

The server will start on:
🌐 [http://localhost:5000](http://localhost:5000)

---

---
## Example
## 🔧 Configure the Request using Postman or ThunderClient

### 🌀 A. Round Robin (RR) Scheduling Example

| Field       | Value                                          |
| ----------- | ---------------------------------------------- |
| **Method**  | `POST`                                         |
| **URL**     | `http://localhost:5000/api/scheduler/schedule` |
| **Headers** | `Content-Type: application/json`               |

### 📦 Body (Raw JSON)

```json
{
  "algorithm": "RR",
  "timeQuantum": 2,
  "processes": [
    { "pid": "P1", "arrivalTime": 0, "burstTime": 5 },
    { "pid": "P2", "arrivalTime": 1, "burstTime": 3 },
    { "pid": "P3", "arrivalTime": 2, "burstTime": 8 },
    { "pid": "P4", "arrivalTime": 3, "burstTime": 6 }
  ]
}
```
---

## 🚀 Send the Request

Click the **"Send"** button in your API testing tool.
---

## ✅ Check the Response

A successful response will look like this:

```json
{
  "success": true,
  "algorithm": "RR",
  "timeQuantum": 2,
  "processes": [
    {
      "pid": "P1",
      "arrivalTime": 0,
      "burstTime": 5,
      "priority": 0,
      "waitingTime": 7,
      "turnaroundTime": 12,
      "startTime": 0,
      "finishTime": 12
    },
    {
      "pid": "P2",
      "arrivalTime": 1,
      "burstTime": 3,
      "priority": 0,
      "waitingTime": 5,
      "turnaroundTime": 8,
      "startTime": 1,
      "finishTime": 9
    },
    {
      "pid": "P3",
      "arrivalTime": 2,
      "burstTime": 8,
      "priority": 0,
      "waitingTime": 9,
      "turnaroundTime": 17,
      "startTime": 2,
      "finishTime": 19
    },
    {
      "pid": "P4",
      "arrivalTime": 3,
      "burstTime": 6,
      "priority": 0,
      "waitingTime": 13,
      "turnaroundTime": 19,
      "startTime": 3,
      "finishTime": 22
    }
  ],
  "executionOrder": ["P1", "P2", "P3", "P4", "P1", "P3", "P4", "P1", "P3", "P4", "P3"],
  "averageWaitingTime": 8.5,
  "averageTurnaroundTime": 14.0
}
```

---

