import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

export const Form = () => {
    const [question, setQuestion] = useState('');
    const [yes, setYes] = useState('');
    const [no, setNo] = useState('');
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const onQuestionInputChange = ({ target }) => setQuestion(target.value);
    const isQuestionEmpty = question.trim() === '';

    const onYesInputChange = ({ target }) => setYes(target.value);
    const onNoInputChange = ({ target }) => setNo(target.value);

    const onFileChange = (event) => {
        if (event.target.files.length > 0) {
          setFile(event.target.files[0]);
          const reader = new FileReader();
          reader.onload = (e) => setImageUrl(e.target.result);
          reader.readAsDataURL(event.target.files[0]);
        } else {
          setFile(null);
          setImageUrl('');
        }
      };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const defaultQuestion = question.trim() === '' ? 'Question' : question;
        const affirmative = yes.trim() === '' ? 'Yes' : yes;
        const negative = no.trim() === '' ? 'No' : no;
    
        const params = new URLSearchParams();
        params.append('question', defaultQuestion);
        params.append('yes', affirmative);
        params.append('no', negative);
        if (imageUrl) {
          params.append('imageUrl', imageUrl);
        }
    
        navigate(`/question?${params.toString()}`);
      };

    return (
        <form onSubmit={handleSubmit}>
            <div className="question-section">
                <label htmlFor="question">Enter your question <span>*</span> </label>
                <input onChange={onQuestionInputChange} type="text" required placeholder='Type the question to display' id='question' autoComplete="off" />
            </div>

            <div className="situations">
                <div className="situation">
                    <label htmlFor="YesText">
                        <p>Affirmative situation</p>
                        <p>(static)</p>
                    </label>
                    <input onChange={onYesInputChange} type="text" id="YesText" placeholder="Yes" autoComplete="off" />

                    <div className="file-section">
                        <label htmlFor="YesImage">Upload an image</label>
                        <input onChange={onFileChange} type="file" id="YesImage" accept="image/png, image/jpeg, image/jpg" />
                        {file && (<span> ✓ </span>)}
                        <FontAwesomeIcon className='info' icon={faCircleInfo} title="They'll see this picture when Yes is clicked" />
                    </div>
                </div>

                <div className="situation">
                    <label htmlFor="NoText">
                        <p>Negative situation</p>
                        <p>(moving)</p>
                    </label>
                    <input onChange={onNoInputChange} type="text" id="NoText" placeholder="No" autoComplete="off" />
                </div>
            </div>

            <button type="submit" className={`submit ${isQuestionEmpty ? 'unavailable' : ''}`} disabled={isQuestionEmpty}>
                Generate
            </button>
        </form>
    )
}