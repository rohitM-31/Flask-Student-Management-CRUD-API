import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    const response = await axios.get("http://127.0.0.1:5000/students");
    setStudents(response.data);
  };

  const addStudent = async () => {
    await axios.post("http://127.0.0.1:5000/students", {
      id: Date.now(),
      name: "Rohit"
    });

    getStudents();
  };

  const updateStudent = async (id) => {
    await axios.put(
      `http://127.0.0.1:5000/students/${id}`,
      {
        name: "Rahul"
      }
    );

    getStudents();
  };

  const patchStudent = async (id) => {
    await axios.patch(
      `http://127.0.0.1:5000/students/${id}`,
      {
        name: "Krishna"
      }
    );

    getStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(
      `http://127.0.0.1:5000/students/${id}`
    );

    getStudents();
  };

  return (
    <div>
      <h1>Flask + React CRUD</h1>

      <button onClick={addStudent}>
        Add Student
      </button>

      {students.map((student) => (
        <div key={student.id}>
          <h3>{student.name}</h3>

          <button onClick={() => updateStudent(student.id)}>
            Update
          </button>

          <button onClick={() => patchStudent(student.id)}>
            Patch
          </button>

          <button onClick={() => deleteStudent(student.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
