import React, { useRef, useState, useEffect } from 'react';
import MathInput from "react-math-keyboard";
import TextField from '@mui/material/TextField';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useForm } from 'react-hook-form';
import { RadioGroup, Radio, FormControlLabel, Button, Box, Checkbox } from '@mui/material';
import { MuiFileInput } from 'mui-file-input'

import { Header, Sidebar, Footer } from '../components';

const CreateQuiz = ({ isOpen }) => {
    const firstMathfieldRef = useRef();
    const [value1, setValue1] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentOptions, setCurrentOptions] = useState(['', '', '', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
    const [questionImage, setQuestionImage] = useState(null);

    const { register, handleSubmit, setError: setFormError, formState: { errors } } = useForm();


    const clear = () => {
        firstMathfieldRef.current.latex("");
    };

    const onSubmit = async (values) => {
        let quiz_title = values.title;
        let subject = values.subject;
        let grade = values.grade;

        const quizData = {
             quiz_title, subject, grade, questions
        };
        console.log(quizData)
    }
    
      const handleAddQuestion = (event) => {
        event.preventDefault(); 
        if (correctAnswerIndex === null) {
            alert('Выберите правильный вариант ответа');
            return;
          }
        const newQuestion = {
            question: currentQuestion,
            options: [...currentOptions],
            correctAnswerIndex: correctAnswerIndex,
            image: questionImage
          };
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
        setCurrentQuestion('');
        setCurrentOptions(['', '', '', '']);
        setQuestionImage(null);
        setCorrectAnswerIndex(null);
        console.log(newQuestion)
    }
    useEffect(() => {
        console.log(questions);
      }, [questions]);

      const handleChangeFile = (newValue) => {
        setQuestionImage(newValue);

        // const file = e.target.files[0];
        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     setQuestionImage(reader.result);
        // };
        // if (file) {
        //     reader.readAsDataURL(file);
        // }
      }
  return (
    <div className={isOpen ? 'content with-sidebar create-quiz' : 'content with-sidebar create-quiz m-less'}>
        <Sidebar isAddingQuiz/>
        <div className="container">
            <Header/>
            <div className="inner">
                <h1 className="h1">Создать квиз</h1>
                <div className="create-quiz__form">
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="create-quiz__form-row">
                            <Select
                                color="primary"
                                disabled={false}
                                placeholder="Выберите предмет"
                                size="md"
                                variant="outlined"
                                sx={{width: "25%"}}
                                {...register('subject', { required: 'Выберите предмет' })}
                            >
                                <Option value='Математика'>Математика</Option>
                                <Option value='Биология'>Биология</Option>
                                <Option value='Химия'>Химия</Option>
                                <Option value='Физика'>Физика</Option>
                            </Select>
                            <Select
                                color="primary"
                                disabled={false}
                                placeholder="Выберите сложность"
                                size="md"
                                variant="outlined"
                                sx={{width: "25%"}}
                                {...register('subject', { required: 'Выберите сложность' })}
                            >
                                <Option value='Легкий'>Легкий</Option>
                                <Option value='Средний'>Средний</Option>
                                <Option value='Сложный'>Сложный</Option>
                            </Select>
                            <Select
                                color="primary"
                                disabled={false}
                                placeholder="Выберите язык"
                                size="md"
                                variant="outlined"
                                sx={{width: "25%"}}
                                {...register('language', { required: 'Выберите язык' })}
                            >
                                <Option value='Легкий'>Казахский</Option>
                                <Option value='Средний'>Русский</Option>
                                <Option value='Сложный'>Английский</Option>
                            </Select>
                            
                            <Select
                                color="primary"
                                disabled={false}
                                placeholder="Выберите длительность"
                                size="md"
                                variant="outlined"
                                sx={{width: "25%"}}
                                {...register('duration', { required: 'Выберите длительность' })}
                            >
                                <Option value='Легкий'>30 мин</Option>
                                <Option value='Средний'>45 мин</Option>
                                <Option value='Сложный'>60 мин</Option>
                            </Select>
                        {/* <MuiFileInput value={questionImage} onChange={handleChangeFile} /> */}
                        </div>
                        <div className="create-quiz__form-row">
                        <TextField
                            label="Название квиза"
                            error={Boolean(errors.title?.message)}
                            helperText={errors.title?.message}
                            fullWidth
                            className="input"
                            {...register('title', { required: 'Введите заголовок' })}
                        />
                        <TextField
                            label="Описание"
                            value={currentQuestion}
                            onChange={(e) => setCurrentQuestion(e.target.value)}
                            fullWidth
                            {...register('description', { required: 'Введите описание' })}
                        />
                        </div>
                        <TextField
                            label="Введите вопрос"
                            value={currentQuestion}
                            onChange={(e) => setCurrentQuestion(e.target.value)}
                            fullWidth
                        />
                        <input
                            type="file"
                            onChange={(e) => {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setQuestionImage(reader.result);
                            };
                            if (file) {
                                reader.readAsDataURL(file);
                            }
                            }}
                        />
                        {questionImage && (
                            <img src={questionImage} alt="Question" style={{ maxWidth: '100%', maxHeight: '200px', width: '400px', objectFit: 'cover'}} />
                        )}
                        <Box mt={4}>
                            {[...Array(4)].map((option, index) => (
                            <div key={index} className='option-variant-item' >
                                <TextField
                                label={`Вариант ${index + 1}`}
                                value={currentOptions[index]}
                                onChange={(e) => {
                                    const newOptions = [...currentOptions];
                                    newOptions[index] = e.target.value;
                                    setCurrentOptions(newOptions);
                                  }}
                                fullWidth
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                    checked={correctAnswerIndex === index}
                                    color="success"
                                    sx={{fontSize: "14px"}}
                                    onChange={() => setCorrectAnswerIndex(index)}
                                    />}
                                    label={`Правильный ответ`}
                                    sx={{width: "25%"}}
                                />
                            </div>
                            ))}
                        </Box>
                        <Button variant="contained" color="primary" onClick={handleAddQuestion}>
                            Добавить вопрос
                        </Button>
                    <button className="btn btn--secondary" type="submit">
                        Создать квиз
                    </button>
                    </form>
                </div>
            </div>
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
            </div>
            </div>
            <Footer/>
        </div>
    </div>
  )
}

export default CreateQuiz