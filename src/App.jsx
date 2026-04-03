import React from "react"
import caculateImg from './images/illustration-empty.svg'

export default function App(){
    const [Amount, setAmount] = React.useState("")
    const [Term, setTerm] = React.useState("")
    const [Interest, setInterest ] = React.useState("")
    const [MonthlyRepayment, setMonthlyRepayment ] = React.useState(null)
    const [TotalRepayment, setTotalRepayment ] = React.useState()
    const [Errors, setErrors] = React.useState({
        amount: "",
        term: "",
        interest: ""
    })
    const [mortgageType, setMortgageType] = React.useState("")

    function calculateRepayments() {
    const principal = Number(Amount);
    const monthlyRate = Number(Interest) / 100 / 12;
    const numberOfPayments = Term * 12;

    let newErrors = { amount: "", term: "", interest: "" };

    if (Term === "" || Term <= 0) newErrors.term = "Enter a valid term";
    if (Interest === "" || Interest < 0) newErrors.interest = "Enter a valid interest rate";
    if (Amount === "" || Amount <= 0) newErrors.amount = "Enter a valid mortgage amount";

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== "")) return;

    let monthly, total;

    if (mortgageType === "interest-only") {
        monthly = principal * monthlyRate;        
        total = monthly * numberOfPayments;       
    } else {
        if (monthlyRate === 0) {
            monthly = principal / numberOfPayments; 
        } else {
            monthly =
                (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }
        total = monthly * numberOfPayments;
    }

    setMonthlyRepayment(monthly.toFixed(2));
    setTotalRepayment(total.toFixed(2));
}

    return (<>
    <div className="flex justify-center mt-6 mb-6">
        <div className="bg-amber-100 p-7 rounded-2xl left-side-div"> 
            <div>
            <span className="flex gap-28 justify-between"> 
            <h1 className="text-xl font-bold">Mortgage Calculator</h1> 
            <a href=""><p className="underline text-gray-300">Clear All</p></a>
            </span>
            </div>

            <div className="input-container my-5 flex flex-col">
                <span className="text-gray-500">Mortage Amount</span>
                <div className="border flex h-8">
                    <span className="bg-blue-300 flex px-4 text-center justify-center items-center">$</span>
                <input type="number" className="bg-white w-full outline-none" value={Amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
                {Errors.amount !== "" && <p className="text-red-400">{Errors.amount}</p>}
            </div>

            <div className="term-interest-container flex gap-3">
                <div className="term-container flex flex-col">
                <span className="text-gray-500">Mortage Term</span>
                <div className="border flex h-8">
                    
                <input type="number" className="bg-white w-full outline-none px-2" value={Term} onChange={(e) => setTerm(e.target.value)}/>
                <span className="bg-blue-300 flex px-4 text-center justify-center items-center">years</span>
                </div>
                {Errors.term !== "" && <p className="text-red-400">{Errors.term}</p>}
                 </div>

                 <div className="interest-container flex flex-col">
                <span className="text-gray-500">Mortage Interest</span>
                <div className="border flex h-8">
                <input type="number" className="bg-white w-full outline-none h-8 px-2" value={Interest} onChange={(e) => setInterest(e.target.value)}/>
                <span className="bg-blue-300 flex px-4 text-center justify-center items-center">%</span>
                </div>
                {Errors.interest !== "" && <p className="text-red-400">{Errors.interest}</p>}
                 </div>

            </div>

            <div className="mortgage-type my-5">
                <span className="text-gray-500">Mortgage Type</span>
                <div className="">
                    <div className="border border-gray-400 p-2 my-4">
                        <input type="radio" id="repayment-radio" name="radio" value="repayment" checked={mortgageType === "repayment"} onChange={(e) => setMortgageType(e.target.value)}/> <label htmlFor="repayment-radio" className="font-bold text-lg text-gray-500">Repayment</label>
                    </div>
                    <div className="border border-gray-400 p-2 my-4">
                        <input type="radio" id="interest-only-radio" name="radio" value="interest-only" checked={mortgageType === "interest-only"} onChange={(e) => setMortgageType(e.target.value)}/> <label htmlFor="interest-only-radio" className="font-bold text-lg text-gray-500">Interest Only</label>
                    </div>
                </div>
            </div>

            <div className="calculate-div flex justify-center items-center ">
            <button className="bg-green-500 p-5 rounded-xl font-medium text-gray-800" onClick={calculateRepayments}>Calculate Repayments</button>
            </div>
        </div>
        
        {
            MonthlyRepayment === null &&
        <div className="bg-gray-900 w-md flex justify-center items-center right-side-div text-center">
            <div className="flex justify-center items-center flex-col">
             <img src={caculateImg} className="w-50"/>
             <div className="flex flex-col">
             <span className="text-white font-bold space-x-3 h-6">Results shown here</span>
             <span className="text-gray-500">Complete the form and click "calculate repayments" to <br />see what your monthly repayments would be</span>
             </div>
              </div>
        </div>}
        {
            MonthlyRepayment !== null && mortgageType === "repayment" &&
            <div className="bg-gray-900 w-md flex right-side-div flex-col">
                <div className="m-4 ">
                    <h1 className="font-bold text-gray-200">Your Results</h1>
                    <p className="my-4 text-gray-400 text-sm">Your results are shown based on the information you provided.To adjust the results, edit the form and click "calculate repayments" again</p>
                </div>
                <div className="font-medium bg-gray-500 m-5 p-5 border-t-2 border-amber-300 rounded-xl">
                    <span className="my-5 text-gray-300">Your Monthly Repayments</span>
                    <p className="text-green-300 text-6xl font-medium">${MonthlyRepayment}</p>
                    <hr className="my-7 text-gray-400"/>
                    <span className="text-gray-300 text-sm">Total you'll pay over the term</span>
                    <p className="text-lg text-white">${TotalRepayment}</p>
                </div>
            </div>
        }
        { 
            MonthlyRepayment !== null && mortgageType === "interest-only" && 
            <div className="bg-gray-900 w-md flex right-side-div flex-col">
                <div className="m-4 ">
                    <h1 className="font-bold text-gray-200">Your Results</h1>
                    <p className="my-4 text-gray-400 text-sm">Your results are shown based on the information you provided.To adjust the results, edit the form and click "calculate repayments" again</p>
                </div>
                <div className="font-medium bg-gray-500 m-5 p-5 border-t-2 border-amber-300 rounded-xl">
                    <span className="my-5 text-gray-300">Your Monthly Repayments</span>
                    <p className="text-green-300 text-6xl font-medium">${MonthlyRepayment}</p>
                    <hr className="my-7 text-gray-400"/>
                    <span className="text-gray-300 text-sm">Total you'll pay over the term</span>
                    <p className="text-lg text-white">${TotalRepayment}</p>
                </div>
            </div>
        }
    </div>
    </>    
    )
}