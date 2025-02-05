# **Test Design for School Management System (SMS)**  

## **1. Introduction**  
The test design outlines the **testing approach, test scenarios, test techniques, and test cases** for the School Management System (SMS). The primary objective is to ensure the **functional, non-functional, and security aspects** of the system meet the defined requirements.  

---

## **2. Test Design Approach**  
The test design follows a **structured testing approach**:  
1. **Requirements Analysis**: Identify core functionalities from the system requirements.  
2. **Test Case Development**: Write detailed test cases for each module.  
3. **Test Data Preparation**: Define valid and invalid test data.  
4. **Test Execution**: Execute test cases and log defects.  
5. **Defect Tracking & Reporting**: Document defects and track resolution.  
6. **Regression Testing**: Re-run previous test cases after bug fixes.  

### **2.1 Test Levels**  
| **Test Level**  | **Description** |  
|---------------|----------------|  
| **Unit Testing** | Test individual components and functions. |  
| **Integration Testing** | Verify data flow between different modules. |  
| **System Testing** | Validate the entire system against requirements. |  
| **User Acceptance Testing (UAT)** | End-users test system in real-world scenarios. |  

### **2.2 Test Techniques**  
| **Technique** | **Usage** |  
|--------------|---------|  
| **Equivalence Partitioning** | Group test inputs into valid and invalid partitions. |  
| **Boundary Value Analysis** | Test edge cases (e.g., min/max values). |  
| **Decision Table Testing** | Test system behavior for different input conditions. |  
| **State Transition Testing** | Validate transitions between different system states. |  
| **Error Guessing** | Identify potential failure points based on experience. |  

---

## **3. Test Scenarios**  
Below are the high-level test scenarios for the SMS:  

### **3.1 Student Management Module**  
✅ **Scenario 1**: Verify student registration with valid details.  
✅ **Scenario 2**: Attempt student registration with missing/invalid details.  
✅ **Scenario 3**: Search for a student by name, ID, or class.  
✅ **Scenario 4**: Edit student details and ensure changes reflect correctly.  
✅ **Scenario 5**: Delete a student and verify data removal.  

### **3.2 Staff Management Module**  
✅ **Scenario 6**: Add a new staff member with required details.  
✅ **Scenario 7**: Validate login access for different staff roles.  
✅ **Scenario 8**: Update staff details and verify changes.  
✅ **Scenario 9**: Restrict unauthorized users from accessing staff data.  

### **3.3 Course/Class Management Module**  
✅ **Scenario 10**: Create a new course and assign teachers.  
✅ **Scenario 11**: Enroll students into a class.  
✅ **Scenario 12**: View course schedule and verify class timings.  

### **3.4 Fee Management Module**  
✅ **Scenario 13**: Record student fee payment and generate receipts.  
✅ **Scenario 14**: Validate fee due notifications for unpaid fees.  

### **3.5 Attendance Management Module**  
✅ **Scenario 15**: Mark student attendance and verify records.  
✅ **Scenario 16**: Generate attendance reports for a specific class.  


### **3.6 Administrative Dashboard**  
✅ **Scenario 25**: Display system-wide statistics (e.g., total students, fee reports).  

---

## **4. Test Cases**  

### **Test Case 1: User Login**  
| **Test Case ID** | TC-001 |  
|----------------|---------|  
| **Test Title** | Verify user login with valid credentials |  
| **Module** | Authentication |  
| **Preconditions** | User is registered in the system. |  
| **Test Steps** | 1. Open the login page. <br> 2. Enter a valid username and password. <br> 3. Click "Login". |  
| **Expected Result** | User is successfully logged in and redirected to the dashboard. |  
| **Postconditions** | User session is active. |  
| **Status** | Pass/Fail |  

---

### **Test Case 2: Student Registration**  
| **Test Case ID** | TC-002 |  
|----------------|---------|  
| **Test Title** | Verify student registration |  
| **Module** | Student Management |  
| **Preconditions** | The user has admin privileges. |  
| **Test Steps** | 1. Navigate to the student registration form. <br> 2. Enter student details (name, DOB, class, parent info). <br> 3. Click "Submit". |  
| **Expected Result** | Student should be successfully registered, and an ID assigned. |  
| **Postconditions** | Student details appear in the database. |  
| **Status** | Pass/Fail |  

---

### **Test Case 3: Mark Student Attendance**  
| **Test Case ID** | TC-003 |  
|----------------|---------|  
| **Test Title** | Verify student attendance marking |  
| **Module** | Attendance Management |  
| **Preconditions** | Students and teachers exist in the system. |  
| **Test Steps** | 1. Navigate to the attendance module. <br> 2. Select the class and date. <br> 3. Mark attendance for students. <br> 4. Click "Submit". |  
| **Expected Result** | Attendance should be saved and visible in reports. |  
| **Postconditions** | Attendance records stored in the database. |  
| **Status** | Pass/Fail |  

---

### **Test Case 4: Fee Payment Processing**  
| **Test Case ID** | TC-004 |  
|----------------|---------|  
| **Test Title** | Verify student fee payment process |  
| **Module** | Fee Management |  
| **Preconditions** | Student exists in the system with pending fees. |  
| **Test Steps** | 1. Open the fee payment module. <br> 2. Enter student ID and payment details. <br> 3. Click "Pay Now". |  
| **Expected Result** | Payment is processed, and a receipt is generated. |  
| **Postconditions** | Updated fee balance in the system. |  
| **Status** | Pass/Fail |  

---

## **5. Non-Functional Test Cases**  

### **Performance Test Case 1: System Load Test**  
| **Test Case ID** | PTC-001 |  
|----------------|---------|  
| **Test Title** | Verify system performance under heavy load |  
| **Test Steps** | Simulate **1000 simultaneous users** accessing the system. |  
| **Expected Result** | System should respond without crashes or major delays. |  

### **Security Test Case 1: SQL Injection Prevention**  
| **Test Case ID** | STC-001 |  
|----------------|---------|  
| **Test Title** | Prevent SQL injection attacks |  
| **Test Steps** | Enter **' OR '1'='1' --** as the username. |  
| **Expected Result** | System should **not** allow unauthorized access. |  

