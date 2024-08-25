import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { errorMessageAtom, showErrorDialogAtom } from "../recoil/atoms";

export function BottomFooter({information,linkTo,linkLabel}){

    const setErrorMessage = useSetRecoilState(errorMessageAtom);
    const setShowErrorDialog = useSetRecoilState(showErrorDialogAtom);

    const resetErrorMsg = ()=>{
        setErrorMessage("");
        setShowErrorDialog(false);
    }

    return(
        <div className=" flex justify-center items-center  w-full text-lg font-medium mt-2">
            <div className="pr-2">
                {information}
            </div>
            <div>
                <Link onClick={resetErrorMsg} className="underline hover:opacity-50" to={linkTo}>{linkLabel}</Link>
            </div>
        </div>
    )
}