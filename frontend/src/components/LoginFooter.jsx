import { Link } from "react-router-dom";

export function BottomFotter({information,linkTo,linkLabel}){

    return(
        <div className=" flex justify-center items-center m-2 w-full text-xl font-medium">
            <div className="pr-2">
                {information}
            </div>
            <div>
                <Link className="underline hover:opacity-50" to={linkTo}>{linkLabel}</Link>
            </div>
        </div>
    )
}