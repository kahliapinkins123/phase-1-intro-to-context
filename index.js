// Your code here
function createEmployeeRecord(array){
    const employeeRecord = {};
    employeeRecord.firstName = array[0];
    employeeRecord.familyName = array[1];
    employeeRecord.title = array[2];
    employeeRecord.payPerHour = array[3];
    employeeRecord.timeInEvents= [];
    employeeRecord.timeOutEvents = [];

    return employeeRecord;

}

function createEmployeeRecords(arrayOfArrays){
    const arrayOfObjects = [];
    arrayOfArrays.map(function(array){
            arrayOfObjects.push(createEmployeeRecord(array));
        
    })

    return arrayOfObjects;
}

function createTimeInEvent(employeeRecord, dateStamp){
    const obj = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.substr(11),10),
        date: dateStamp.substr(0,10)
    };

    employeeRecord.timeInEvents.push(obj);

    return employeeRecord;

}

function createTimeOutEvent(employeeRecord, dateStamp){
    const obj = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.substr(11),10),
        date: dateStamp.substr(0,10)
    };

    employeeRecord.timeOutEvents.push(obj);

    return employeeRecord;

}

function hoursWorkedOnDate(employee,date){
    const timeIn = employee.timeInEvents;
    const timeOut = employee.timeOutEvents;
    let firstHour = 0;
    let lastHour = 0;

    for(let i=0; i<timeIn.length; i++){
        if(timeIn[i].date === date){
             firstHour = timeIn[i].hour;
        }
    }
    for(let i=0; i<timeOut.length; i++){
        if(timeOut[i].date === date){
            lastHour = timeOut[i].hour;
        }
    }
    return (lastHour - firstHour)/100;
}

function wagesEarnedOnDate(employeeRecord,date){
    let payRate = employeeRecord.payPerHour;
    return hoursWorkedOnDate(employeeRecord,date)*payRate;
}

function allWagesFor(employee){
    let total = 0;
    for (let i=0; i<employee.timeInEvents.length;i++){
        total += wagesEarnedOnDate(employee,employee.timeInEvents[i].date)
    }

    return total;
}

function calculatePayroll(arrayOfEmployees){
    let total = 0;
    arrayOfEmployees.map(function(employee){
        total= total + allWagesFor(employee);
    })

    return total;
}