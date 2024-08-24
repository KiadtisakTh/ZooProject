import React, { useState, useEffect } from 'react';
import './css/CrudPage.css';

function CrudPage() {
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    species: '',
    age: '',
    description: '',
    image: null,  // เก็บไฟล์รูปภาพ
  });
  const [editingAnimal, setEditingAnimal] = useState(null);

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    const response = await fetch('http://localhost:8000/api/animals/');
    const data = await response.json();
    setAnimals(data);
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('name', newAnimal.name);
    formData.append('species', newAnimal.species);
    formData.append('age', newAnimal.age);
    formData.append('description', newAnimal.description);
    if (newAnimal.image) {
      formData.append('image', newAnimal.image);
    }

    const response = await fetch('http://localhost:8000/api/animals/', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      fetchAnimals();
      setNewAnimal({ name: '', species: '', age: '', description: '', image: null });
    }
  };

  const handleEdit = (animal) => {
    setEditingAnimal(animal);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('name', editingAnimal.name);
    formData.append('species', editingAnimal.species);
    formData.append('age', editingAnimal.age);
    formData.append('description', editingAnimal.description);
    if (editingAnimal.image) {
        formData.append('image', editingAnimal.image);
    }

    console.log([...formData.entries()]); // ตรวจสอบข้อมูลที่กำลังถูกส่งไปยัง API

    const response = await fetch(`http://localhost:8000/api/animals/${editingAnimal.id}/`, {
        method: 'PUT',
        body: formData,
    });

    if (response.ok) {
        fetchAnimals();
        setEditingAnimal(null);
    } else {
        console.error('Failed to update animal:', await response.json());
    }
};

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8000/api/animals/${id}/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchAnimals();
    }
  };

  return (
    <div className="crud-page">
      <h1>Create Animal</h1>
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          value={newAnimal.name}
          onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Species"
          value={newAnimal.species}
          onChange={(e) => setNewAnimal({ ...newAnimal, species: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={newAnimal.age}
          onChange={(e) => setNewAnimal({ ...newAnimal, age: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newAnimal.description}
          onChange={(e) => setNewAnimal({ ...newAnimal, description: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => setNewAnimal({ ...newAnimal, image: e.target.files[0] })}
        />
        <button onClick={handleCreate}>Create</button>
      </div>

      <div className="animals-list">
  {animals.map((animal) => (
    <div key={animal.id} className="animal-card">
      {animal.image && <img src={animal.image} alt={animal.name} />}
      <p>ชื่อ: {animal.name}</p>
      <p>สายพันธุ์: {animal.species}</p>
      <p>อายุ: {animal.age} ปี</p>
      <p>ข้อมูลเพิ่มเติม: {animal.description}</p>
      <div className="button-group">
        <button onClick={() => handleEdit(animal)} className="edit-button">แก้ไข</button>
        <button onClick={() => handleDelete(animal.id)} className="delete-button">ลบ</button>
      </div>
    </div>
  ))}
</div>

      {editingAnimal && (
        <div className="edit-form">
          <h2>Edit Animal</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={editingAnimal.name}
              onChange={(e) => setEditingAnimal({ ...editingAnimal, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Species"
              value={editingAnimal.species}
              onChange={(e) => setEditingAnimal({ ...editingAnimal, species: e.target.value })}
            />
            <input
              type="number"
              placeholder="Age"
              value={editingAnimal.age}
              onChange={(e) => setEditingAnimal({ ...editingAnimal, age: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={editingAnimal.description}
              onChange={(e) => setEditingAnimal({ ...editingAnimal, description: e.target.value })}
            />
            <input
              type="file"
              onChange={(e) => setEditingAnimal({ ...editingAnimal, image: e.target.files[0] })}
            />
            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrudPage;
