import React, { useState } from 'react';

const DynamicForm = ({ formData, setFormData }) => {
  const [sections, setSections] = useState([{ subheading: '', content: '' }]);

  const handleInputChange = (index, event) => {
    const values = [...sections];
    values[index][event.target.name] = event.target.value;
    setSections(values);
    setFormData({...formData, content: values });
  };

  const handleAddSection = () => {
    setSections([...sections, { subheading: '', content: '' }]);
  };

  return (
    <div className="">
      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <label className="text-white block mb-2">Sub Heading</label>
          <input
            type="text"
            name="subheading"
            value={section.subheading}
            onChange={(e) => handleInputChange(index, e)}
            className="w-full p-2 mb-4 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <label className="text-white block mb-2">Description</label>
          <textarea
            name="content"
            value={section.content}
            onChange={(e) => handleInputChange(index, e)}
            className="w-full p-2 mb-4 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="3"
          ></textarea>
        </div>
      ))}

      <button
        onClick={handleAddSection}
        className="w-full p-2 text-purple-400 border border-gray-600 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        Add More Sub Heading +
      </button>
    </div>
  );
};

export default DynamicForm;
