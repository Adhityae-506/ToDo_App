import { db } from "../db/db.js";
import { tasks } from "../schema/tasks.js";
import { eq, and } from "drizzle-orm";

export const createTask = async(req,res) => {
    try{
        const{title, taskDate} = req.body;

        const newTask = await db
        .insert(tasks)
        .values({
            title,
            taskDate,
            userId: req.user.id,
        })
        .returning();

        res.status(201).json(newTask[0]);
    }catch(err){
        res.status(500).json({message: "Failed to create task"});
    }
};

export const getTasks = async(req,res) =>{
    try{
        const userTasks = await db
        .select()
        .from(tasks)
        .where(eq(tasks.userId, req.user.id));

        res.json(userTasks);
    }catch(err){
        res.status(500).json({message: "Failed to fetch tasks"});
    }
};

export const updateTask = async(req, res) =>{
    try{
        const {id} = req.params;
        const {title, taskDate} = req.body;

        const updated = await db
        .updated(tasks)
        .set({title, taskDate})
        .where(and(eq(tasks.id, id), eq(tasks.userId, req.user.id)))
        .returning()
        
        res.josn(updated[0]);
    }catch(err){
        res.status(500).json({message: "Failed to update task"});
    }
};

export const toggleTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.id, id), eq(tasks.userId, req.user.id)));

    if (!task.length) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updated = await db
      .update(tasks)
      .set({ completed: !task[0].completed })
      .where(eq(tasks.id, id))
      .returning();

    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle task" });
  }
};
    
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await db
      .delete(tasks)
      .where(and(eq(tasks.id, id), eq(tasks.userId, req.user.id)));

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};


export const getStats = async (req, res) => {
  try {
    const userTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, req.user.id));

    const total = userTasks.length;
    const completed = userTasks.filter(t => t.completed).length;
    const pending = total - completed;

    res.json({ total, completed, pending });
  } catch (err) {
    res.status(500).json({ message: "Failed to get stats" });
  }
};