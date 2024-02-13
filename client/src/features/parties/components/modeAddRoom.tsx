import React, { useState } from 'react';

interface ModeAddRoomProps {
  onClose: () => void;
}

const ModeAddRoom: React.FC<ModeAddRoomProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState('');
  const [questions1, setQuestions1] = useState('');
  const [questions2, setQuestions2] = useState('');
  const [questions3, setQuestions3] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleMembersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMembers(e.target.value);
  };

  const handleQuestions1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestions1(e.target.value);
  };

  const handleQuestions2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestions2(e.target.value);
  };

  const handleQuestions3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestions3(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose()
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Name:
          <input value={name} type="text" onChange={handleNameChange} />
        </div>
        <div>
          Description:
          <input value={description} type="text" onChange={handleDescriptionChange} />
        </div>
        <div>
          Members:
          <input value={members} type="text" onChange={handleMembersChange} />
        </div>
        <div>
          Questions1:
          <input value={questions1} type="text" onChange={handleQuestions1Change} />
        </div>
        <div>
          Questions2:
          <input value={questions2} type="text" onChange={handleQuestions2Change} />
        </div>
        <div>
          Questions3:
          <input value={questions3} type="text" onChange={handleQuestions3Change} />
        </div>
        <button type='submit'>Create</button>
        <button onClick={onClose}>Закрыть</button>
      </form>
    </div>
  );
}

export default ModeAddRoom;