"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import DataTable from './../../../components/dashboard/DataTable';
import UserFormModal from "@/components/dashboard/users/UserFormModal";


export default function UsersPage() {
  const [users,setUsers]=useState([]); const [loading,setLoading]=useState(true);
  const [open,setOpen]=useState(false); const [edit,setEdit]=useState(null);

  const fetchUsers=async()=>{ try{const r=await api.get("/api/users");setUsers(r.data);}
    catch{toast.error("Failed to load users");} finally{setLoading(false);} };
  useEffect(()=>{fetchUsers();},[]);

  const submit=async(d)=>{ try{
    if(edit) await api.put(`/api/users/${edit._id}`,d); else await api.post("/api/users",d);
    toast.success(edit?"User updated":"User added"); fetchUsers(); setOpen(false); setEdit(null);
  }catch{toast.error("Save failed");} };

  const del=async(id)=>{ if(!confirm("Delete user?"))return;
    try{await api.delete(`/api/users/${id}`);toast.success("Deleted");fetchUsers();}
    catch{toast.error("Delete failed");} };

  const cols=[
    {header:"Name",cell:r=>r.name},
    {header:"Email",cell:r=>r.email},
    {header:"Role",cell:r=>r.role},
    {header:"Status",cell:r=>
      <span className={`px-2 py-1 rounded-full text-xs ${
        r.status==="active"?"bg-green-500/10 text-green-300":"bg-red-500/10 text-red-300"}`}>
        {r.status}
      </span>}
  ];

  return(
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-semibold">Users</h1>
      <button onClick={()=>setOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded flex items-center gap-2">
        <Plus size={16}/> Add User
      </button>
    </div>
    <DataTable columns={cols} data={users} loading={loading}
               onEdit={(r)=>{setEdit(r);setOpen(true);}} onDelete={del}/>
    <UserFormModal isOpen={open} onClose={()=>{setOpen(false);setEdit(null);}}
                   onSubmit={submit} initialData={edit}/>
  </div>);
}
