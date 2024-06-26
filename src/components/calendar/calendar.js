import Heading from "./heading";
import './calendar.css';
import Dates from "./dates";
export default function Calendar(){
    return(
        <div className="calendar">
            <section className="heading"><Heading/></section>
            <section className="dates"><Dates/></section>

        </div>

    );

}