import './dates.css';
import {useState} from 'react';
export default function Dates(){
    const [activeIndex, setActiveIndex] = useState(null)
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const newDates = []
    var currDate = new Date()
    // Function to get the dates for the current month and the remaining dates from the previous month
    // var newDates = []
    function getMonthDates(date){
        var currentDate = date;
        var currentMonth = currentDate.getMonth()
        var currentYear = currentDate.getFullYear()
        var firstDay = new Date(currentYear, currentMonth, 1).getDay()
        var LastDate = new Date(currentYear, currentMonth+1, 0).getDate()
        for(var i=1;i<LastDate+1;i++ ){
            newDates.push(i)
        }
        var position=0;
        for(var y=firstDay;y>0;y--){
            LastDate = new Date(currentYear, currentMonth, 0-position).getDate()
            newDates.unshift(LastDate)
            position++;
        }
        var allfull = newDates.length;
        var nextMonth = 1;
        for(var z=42;allfull<z;z--){
            newDates.push(nextMonth)
            nextMonth++
        }
        return newDates
    }

    
    const monthDates = getMonthDates(currDate);
    function MouseOver(index){
        setActiveIndex(index)

    }
    function MouseOut(){
        setActiveIndex(null)
    }
    return(
        <>
        {weekdays.map((day,index,arr)=>(
                    <p  key={index} className="singleday">
                        {day.charAt(0)}
                    </p>
                ))}
        {monthDates.map((eachdate,index,arr)=>(
            <p key={index} className={activeIndex===index ? 'eachDateActive':'eachDate'} id={index} onMouseOver={()=>MouseOver(index)} onMouseOut={MouseOut} onClick={()=>console.log(index)}>{monthDates[index]}</p>
                    
                ))}
        </>
    );
}