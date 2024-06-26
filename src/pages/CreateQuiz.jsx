import React, { useRef, useState, useEffect } from 'react';
import MathInput from "react-math-keyboard";
import TextField from '@mui/material/TextField';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import MenuItem from '@mui/joy/MenuItem';
import { useForm } from 'react-hook-form';
import { RadioGroup, Radio, FormControlLabel, Button, Box, Checkbox } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import { useDispatch, useSelector } from 'react-redux';


import { Header, Sidebar, Footer, AddQuestions, Breadcrumbs } from '../components';
import { useGetGroupNumberForLessonForQuizQuery, useCreateQuizMutation, useGetSubjectLessonForQuizQuery } from '../services/questonsApi';
import { addClassNumber, clearAddedQuestions } from '../redux/slices/questionsSlice';

const CreateQuiz = ({ isOpen }) => {
    const firstMathfieldRef = useRef();
    const [value1, setValue1] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentOptions, setCurrentOptions] = useState(['', '', '', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
    const [questionImage, setQuestionImage] = useState(null);
    const [description, setDescription] = useState('');
    const [classNum, setClassNum] = useState(null)
    

    const dispatch = useDispatch();


    const { register, handleSubmit, reset, setError: setFormError, formState: { errors } } = useForm();

    const [createQuiz] = useCreateQuizMutation();
    const { data: subjects } = useGetSubjectLessonForQuizQuery()
    const { data: classes } = useGetGroupNumberForLessonForQuizQuery();


    const clear = () => {
        firstMathfieldRef.current.latex("");
    };
    const classNumber = useSelector(state => state.questions.class_number);
    const addedQuestions = useSelector(state => state.questions.addedQuestions);

    const questionsId = addedQuestions.map(question => question.id);

    const onSubmit = async (values) => {
        const newQuestion = {
            question: currentQuestion,
            options: [...currentOptions],
            correctAnswerIndex: correctAnswerIndex,
            image: questionImage
          };
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);

        let quiz_title = values.title;
        let subject = values.subject;
        let level = values.level;
        let language = values.language;
        let duration = values.duration;
        let description = values.description;
        let owner = 8

        const quizData = {
             title: quiz_title, description, level, language, duration, questions: questionsId, subject, owner
        };
        try {
            const responce = await createQuiz(quizData);
            alert(`Квиз ${responce.data.title} успешно создан`);
            dispatch(clearAddedQuestions());
             // Очищаем storedSelectedQuestions в localStorage
            localStorage.removeItem('selectedQuestions');
            reset();
        } catch(err) {
            console.error(err)
            alert(`Ошибка при создании квиза ${err}`);
        } 
    }


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

      const handleChange = (e) => {
            setClassNum(e.target.value);
      };

      useEffect(() => {
        dispatch(addClassNumber(classNum))
      }, [classNum])
      
  return (
    <div className={isOpen ? 'content with-sidebar create-quiz' : 'content with-sidebar create-quiz m-less'}>
        <Sidebar isAddingQuiz/>
        <div className="container">
            <Header/>
            <div className="inner">
                <Breadcrumbs/>
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
                                sx={{width: "20%"}}
                                // onChange={(e) => setSubject(e.target.value)}
                                {...register('subject', { required: 'Выберите предмет' })}
                            >
                                {
                                    subjects?.map((item) => (
                                        <Option value={item.id} key={item.id}>{item.title}</Option>
                                    ))
                                }
                            </Select>
                            <Select
                                color="primary"
                                disabled={false}
                                placeholder="Выберите сложность"
                                size="md"
                                variant="outlined"
                                sx={{width: "20%"}}
                                // onChange={(e) => setGrade(e.target.value)}
                                {...register('level', { required: 'Выберите сложность' })}
                            >
                                <Option value='Easy'>Легкий</Option>
                                <Option value='Medium'>Средний</Option>
                                <Option value='Hard'>Сложный</Option>
                            </Select>
                            <Select
                                color="primary"
                                disabled={false}
                                placeholder="Выберите язык"
                                size="md"
                                variant="outlined"
                                sx={{width: "20%"}}
                                // onChange={(e) => setLanguage(e.target.value)}
                                {...register('language', { required: 'Выберите язык' })}
                            >
                                <Option value='Казахский'>Казахский</Option>
                                <Option value='Русский'>Русский</Option>
                                <Option value='Английский'>Английский</Option>
                            </Select>                           
                            <Select
                                color="primary"
                                disabled={false}
                                placeholder="Выберите длительность"
                                size="md"
                                variant="outlined"
                                sx={{width: "20%"}}
                                // onChange={(e) => setDuration(e.target.value)}
                                {...register('duration', { required: 'Выберите длительность' })}
                            >
                                <Option value='15'>15 мин</Option>
                                <Option value='30'>30 мин</Option>
                                <Option value='45'>45 мин</Option>
                                <Option value='60'>60 мин</Option>
                            </Select>
                            
                            <select style={{width: "20%"}} onChange={(e) => handleChange(e)}>
                                    <option  default>Выберите класс</option>
                                    
                                {
                                    classes?.map((item) => (
                                        <option value={item?.id} key={item?.number}>{item.number}</option>
                                    ))
                                }
                            </select>
                        {/* <MuiFileInput value={questionImage} onChange={handleChangeFile} /> */}
                        </div>
                        <div className="create-quiz__form-row">
                        <TextField
                            label="Название квиза"
                            error={Boolean(errors.title?.message)}
                            helperText={errors.title?.message}
                            fullWidth
                            className="input"
                            {...register('title', { required: 'Введите заголовок', maxLength: { value: 50, message: 'Максимальная длина 50 символов' }  })}
                            
                        />
                        <TextField
                            label="Описание"
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            {...register('description', { required: 'Введите описание' })}
                        />
                        </div>
                        <AddQuestions/>
                    <button className="btn btn--secondary" type="submit">
                        Создать квиз
                    </button>
                    </form>
                </div>
            </div>
            <div className="keyboard">
            <div>
            <div className='inner'>
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