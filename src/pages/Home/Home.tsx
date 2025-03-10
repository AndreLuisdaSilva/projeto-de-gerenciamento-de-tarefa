import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Button from '../../components/ButtonTask.tsx';
import Card from '../../components/Card.tsx';
import { AuthContext } from '../../context/AuthContext'; 
import { api } from '../../services/ApiService'; 

interface Task {
    id: number;
    title: string;
    status: boolean;  
}

const Home: React.FC = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate(); 
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [filter, setFilter] = useState<'Todos' | 'Pendente' | 'Concluída'>('Todos');
    const { userId, userName } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/'); 
    };

    const fetchTasks = async () => {
        try {
            const response = await api.get<Task[]>('/tasks', { headers: { 'userid': userId } }); // Usando a instância 'api'
            console.log("Tarefas recebidas:", response.data);
            setTasks(response.data);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };

    const addTask = async () => {
        if (!newTaskTitle.trim()) return;
        const newTask: Task = {
            id: 0, 
            title: newTaskTitle,
            status: false,  
        };
        try {
            const response = await api.post<Task>('/tasks', newTask, { headers: { 'userid': userId } }); 
            console.log("Nova tarefa adicionada:", response.data);
            setTasks([...tasks, response.data]);
            setNewTaskTitle('');
        } catch (error) {
            console.error("Erro ao adicionar tarefa:", error);
        }
    };

    const editTask = async (id: number, newTitle: string) => {
        if (!newTitle.trim()) return;
        const updatedTask = { title: newTitle };
        try {
            await api.patch(`/tasks/${id}`, updatedTask, { headers: { 'userid': userId } }); 
            setTasks((prevTasks) =>
                prevTasks.map(task =>
                    task.id === id ? { ...task, title: newTitle } : task
                )
            );
        } catch (error) {
            console.error("Erro ao editar tarefa:", error);
        }
    };

    const deleteTask = async (id: number) => {
        try {
            await api.delete(`/tasks/${id}`, { headers: { 'userid': userId } }); 
            setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Erro ao excluir tarefa:", error);
        }
    };

    const toggleTaskStatus = async (id: number) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        if (!taskToUpdate) return;
    
        const updatedStatus = !taskToUpdate.status;  
        const updatedTask = { status: updatedStatus };
    
        try {
            const response = await api.patch(`/tasks/${id}`, updatedTask, { headers: { 'userid': userId } }); 
            console.log('Tarefa atualizada:', response.data); 
    
            setTasks((prevTasks) =>
                prevTasks.map(task =>
                    task.id === id ? { ...task, status: updatedStatus } : task
                )
            );
        } catch (error) {
            console.error("Erro ao atualizar status da tarefa:", error);
        }
    };

    const filteredTasks = tasks.filter(task =>
        filter === 'Todos' || (filter === 'Pendente' ? !task.status : task.status)
    );

    useEffect(() => {
        fetchTasks(); 
    }, []);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <h1 className="text-3xl font-bold">Dashboard de Tarefas</h1>
                </div>
                <div className="flex items-center gap-4"> <span className="font-bold  text-red-500">Login: {userName}</span>
                <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 cursor-pointer">Logout</Button>
                </div>
               
            </div>

            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Nova Tarefa"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="p-2 border rounded-2xl w-full"
                />
                <Button onClick={addTask} className='cursor-pointer'>Adicionar</Button>
            </div>

            <div className="flex gap-4 mb-6">
                <Button onClick={() => setFilter('Todos')} className={`cursor-pointer ${filter === 'Todos' ? 'bg-blue-800 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-600'}`}>Todos</Button>
                <Button onClick={() => setFilter('Pendente')} className={`cursor-pointer ${filter === 'Pendente' ? 'bg-yellow-700 hover:bg-yellow-800' : 'bg-yellow-500 hover:bg-yellow-600'}`}>Pendente</Button>
                <Button onClick={() => setFilter('Concluída')} className={`cursor-pointer ${filter === 'Concluída' ? 'bg-green-700 hover:bg-green-800' : 'bg-green-500 hover:bg-green-600'}`}>Concluída</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTasks.map(task => (
                    <Card key={task.id}>
                        <h2 className="text-xl font-semibold">{task.title}</h2>
                        <p className={`text-gray-600 ${
                            task.status ? 'text-green-500' : 'text-yellow-500'
                        }`}>
                            Status: {task.status ? 'Concluída' : 'Pendente'}
                        </p>
                        <div className="flex gap-2 mt-4">
                            <Button onClick={() => toggleTaskStatus(task.id)} className={`${
                            task.status ? 'bg-yellow-500 hover:bg-yellow-600 cursor-pointer' : 'bg-green-500 hover:bg-green-600 cursor-pointer' 
                        }`}>
                                {task.status ? 'Marcar como Pendente' : 'Marcar como Concluída'}
                            </Button>
                            <Button onClick={() => {
                                const newTitle = prompt('Novo título:', task.title);
                                if (newTitle && newTitle.trim()) {
                                    editTask(task.id, newTitle);
                                }
                            }} className='bg-cyan-500 cursor-pointer hover:bg-cyan-600'>
                                Editar
                            </Button>
                            <Button onClick={() => deleteTask(task.id)} className="bg-red-500 cursor-pointer hover:bg-red-700">Excluir</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Home;
