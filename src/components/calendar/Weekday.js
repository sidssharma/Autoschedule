import './Weekday.css';
export default function Weekday(){
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return(
        <>
        <section className = "days">
            {
                weekdays.map((day,index,arr)=>(
                    <p  key={index} className="singleday">
                        {day.charAt(0)}
                    </p>
                ))
            }
        </section>
        </>
    );
}