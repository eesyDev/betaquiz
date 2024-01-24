import React, { useRef, useState } from 'react';
import MathInput from "react-math-keyboard";
import { Header, Sidebar } from '../components';

const CreateQuiz = ({ isOpen }) => {
    const firstMathfieldRef = useRef();
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");

    const clear = () => {
        firstMathfieldRef.current.latex("");
    };
  return (
    <div className={isOpen ? 'content with-sidebar create-quize' : 'content with-sidebar create-quize m-less'}>
        <Sidebar isAddingQuiz/>
        <div className="container">
            <Header/>
            <div className="keyboard">
            <div>
            <div>
                <p style={{ fontSize: "2rem" }}>
                Input with all the keyboard keys :
                </p>
                <MathInput
                setValue={setValue1}
                setMathfieldRef={(mathfield) =>
                    (firstMathfieldRef.current = mathfield)
                }
                divisionFormat="obelus"
                />
                <button onClick={() => clear()}>Clear</button>
                <p>Latex produced : {value1}</p>
            </div>
            <div>
                <p style={{ fontSize: "2rem" }}>Input with no additional keys :</p>
                <MathInput
                divisionFormat="obelus"
                numericToolbarKeys={[]}
                setValue={setValue2}
                />
                <p>Latex produced : {value2}</p>
            </div>
            <div>
                <p style={{ fontSize: "2rem" }}>Input with custom keys :</p>
                <MathInput
                setValue={setValue3}
                numericToolbarKeys={[
                    "euro",
                    {
                    id: "custom",
                    label: "wow",
                    labelType: "raw",
                    mathfieldInstructions: {
                        content:
                        "\\frac{\\int_a^b 2\\pi e^{2ix}\\cos(\\theta) \\gamma}{\\sum_2^9 i^2 - 1}",
                        method: "write"
                    }
                    },
                    {
                    id: "customLogic",
                    label: "custom logic",
                    labelType: "raw",
                    onClick: () => alert("Clicked!")
                    }
                ]}
                />
                <p>Latex produced : {value3}</p>
            </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default CreateQuiz