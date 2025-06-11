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

You can repeat the same structure for **SJF** and **Priority Scheduling** examples as well if needed.

