import './heading.css';
export default function Heading(){
    const currdateTime = new Date(); 
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return(
        <>
        <div className="firstPart">
        {month[currdateTime.getMonth()]}, {currdateTime.getFullYear()} 
        </div>
        <div className="secondPart">
        Changer
        </div>
        </>
    )
}