import React from 'react';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Button, Box, Checkbox } from '@mui/material';
import { TagInput } from '../components';


const CreateQuestion = ({ currentQuestion, setCurrentQuestion, questionImage, setQuestionImage, currentAnswers, setCurrentAnswers, handleCheckboxChange, handleAddQuestion }) => {
    return (
        <div className="new-queston">
            <h3 className="h3">Добавить новый вопрос</h3>
            <div className="form-row">
                <h4 className="h4">Введите вопрос</h4>
                <TextField
                    label="Введите вопрос"
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    fullWidth
                />
            </div>
            <div className="form-row">
                <h4 className="h4">Добавить теги</h4>
                <TagInput />
            </div>
            <div className="form-row">
                <h4 className="h4">Добавить изображение вопроса</h4>
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
            </div>

            {questionImage && (
                <img src={questionImage} alt="Question" style={{ maxWidth: '100%', maxHeight: '200px', width: '400px', objectFit: 'cover' }} />
            )}
            <Box mt={4}>
                {[...Array(4)].map((option, index) => (
                    <div key={index} className='option-variant-item' >
                        <TextField
                            label={`Вариант ${index + 1}`}
                            value={currentAnswers[index]?.title ?? ''}
                            // error={Boolean(!currentAnswers[index])}
                            // helperText={'empty'}
                            onChange={(e) => {
                                const newOptions = [...currentAnswers];
                                newOptions[index] = { ...newOptions[index], title: e.target.value };
                                setCurrentAnswers(newOptions);
                            }}
                            fullWidth
                        />
                        <FormControlLabel
                            control={<Checkbox
                                checked={currentAnswers[index].correct}
                                color="success"
                                sx={{ fontSize: "14px" }}
                                onChange={() => handleCheckboxChange(index)}
                            />}
                            label={`Правильный ответ`}
                            sx={{ width: "25%" }}
                        />
                    </div>
                ))}
            </Box>
            <Button variant="contained" color="primary" onClick={handleAddQuestion}>
                Добавить вопрос
            </Button>
        </div>
    )
}

export default CreateQuestion