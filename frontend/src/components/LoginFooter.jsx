import { Link } from "react-router-dom";

export function BottomFooter({information,linkTo,linkLabel}){

    return(
        <div className=" flex justify-center items-center  w-full text-lg font-medium mt-2">
            <div className="pr-2">
                {information}
            </div>
            <div>
                <Link className="underline hover:opacity-50" to={linkTo}>{linkLabel}</Link>
            </div>
        </div>
    )
}