import React, { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { useDispatch, useSelector } from 'react-redux';
import { TiDelete } from "react-icons/ti";

import { addTag, removeTag } from '../redux/slices/tagsSlice';
import { useGetTagsForQuestionQuery, useSetTagsForQuestionMutation } from '../services/questonsApi';

function TagInput() {
  const { data } = useGetTagsForQuestionQuery();
  const [setTagMutation] = useSetTagsForQuestionMutation();
  const dispatch = useDispatch();

  const tags = useSelector((state) => state.tags.selectedTags);
  const [currentTags, setCurrentTags] = useState([]);
  
  const handleDelete = (i) => {
    const tagToDelete = tags[i];
    dispatch(removeTag(tagToDelete.id));
  };

  const handleAddition = async (tag) => {
    const trimmedTag = tag.text.trim();
  
    if (trimmedTag === '') {
      // Игнорировать пустой тег
      return;
    }
  
    // Проверяем, что data существует и имеет верный формат
    if (data && Array.isArray(data)) {
      const existingTag = data.find((existingTag) => existingTag.title === trimmedTag);
  
      if (existingTag) {
        console.log('Тег уже существует:', trimmedTag);
        setCurrentTags([...currentTags, { id: existingTag.id, text: existingTag.title }]);
        dispatch(addTag({ id: existingTag.id, text: existingTag.title }));
      } else {
        // Если тег не существует, отправить мутацию
        try {
          const response = await setTagMutation({ title: trimmedTag });
          dispatch(addTag({ id: response.data.id, text: response.data.title }));
        } catch (err) {
          console.log(err);
        }
      }
    }
  
    // setCurrentTags('');
  };
  const suggestion = data?.map((tag) => ({ id: String(tag.id), text: tag.title }))
  
  return (
    <div>
      <ReactTags
        tags={tags?.map(tag => ({ id: String(tag.id), text: tag.text }))}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        suggestions={suggestion}
        placeholder="Введите теги вопроса"
      />
    </div>
  );
}

export default TagInput;

