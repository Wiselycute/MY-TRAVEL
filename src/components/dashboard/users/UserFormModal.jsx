"use client";
import { useState, useEffect } from "react";
export default function UserFormModal({isOpen,onClose,onSubmit,initialData}) {
  const [form,setForm]=useState({name:"",email:"",role:"user",status:"active"});
  useEffect(()=>{if(initialData) setForm(initialData);},[initialData]);
  if(!isOpen) return null;
  const c=e=>setForm({...form,[e.target.name]:e.target.value});
  return(
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md border border-white/10">
      <h2 className="text-xl font-semibold mb-4">{initialData?"Edit User":"Add User"}</h2>
      <input name="name" value={form.name} onChange={c} placeholder="Name" className="w-full p-2 mb-3 bg-slate-700 rounded"/>
      <input name="email" value={form.email} onChange={c} placeholder="Email" className="w-full p-2 mb-3 bg-slate-700 rounded"/>
      <select name="role" value={form.role} onChange={c} className="w-full p-2 mb-3 bg-slate-700 rounded">
        <option value="admin">Admin</option><option value="user">User</option>
      </select>
      <select name="status" value={form.status} onChange={c} className="w-full p-2 bg-slate-700 rounded">
        <option value="active">Active</option><option value="inactive">Inactive</option>
      </select>
      <div className="flex justify-end gap-2 mt-5">
        <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
        <button onClick={()=>onSubmit(form)} className="px-4 py-2 bg-indigo-600 rounded">Save</button>
      </div>
    </div>
  </div>);
}
