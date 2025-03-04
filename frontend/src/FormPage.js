import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Получаем функцию навигации

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/analyze', {
        owner: owner,
        repo: repo,
      });

      const receivedTaskId = response.data.task_id;
       // Проверяем результат
        const checkResult = async () => {
            const resultResponse = await axios.get(`http://localhost:8080/result/${receivedTaskId}`);
            if (resultResponse.data.status === 'Success') {
            setResult(resultResponse.data);
            setLoading(false);
            navigate(`/results`, { state: {result: resultResponse.data} });
            } 
            else {
            setTimeout(checkResult, 1000); // Проверяем каждые 1 секунду
            }
        };

        checkResult();
        } catch (error) {
        console.error("There was an error!", error);
        setLoading(false);
        }
      // Переход на страницу результатов
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Form onSubmit={handleSubmit} style={{ width: '500px' }}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Owner"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="Repository"
            required
          />
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Analyze'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export default FormPage;
