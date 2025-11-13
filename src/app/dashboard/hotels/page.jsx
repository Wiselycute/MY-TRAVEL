"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import DataTable from './../../../components/dashboard/DataTable';
import  HotelFormModal  from '@/components/dashboard/hotels/HotelFormModal';

export default function HotelsPage() {
  const [hotels,setHotels]=useState([]); const [loading,setLoading]=useState(true);
  const [open,setOpen]=useState(false); const [edit,setEdit]=useState(null);

  const fetchHotels=async()=>{ try{const r=await api.get("/api/hotels");setHotels(r.data);}
    catch{toast.error("Failed to load hotels");} finally{setLoading(false);} };
  useEffect(()=>{fetchHotels();},[]);

  const submit=async(d)=>{ try{
    if(edit) await api.put(`/api/hotels/${edit._id}`,d); else await api.post("/api/hotels",d);
    toast.success(edit?"Hotel updated":"Hotel added"); fetchHotels(); setOpen(false); setEdit(null);
  }catch{toast.error("Save failed");} };

  const del=async(id)=>{ if(!confirm("Delete hotel?"))return;
    try{await api.delete(`/api/hotels/${id}`);toast.success("Deleted");fetchHotels();}
    catch{toast.error("Delete failed");} };

  const cols=[
    {header:"Name",cell:r=>r.name},
    {header:"Location",cell:r=>r.location},
    {header:"Rating",cell:r=>r.rating},
    {header:"Price/Night",cell:r=>`$${r.price_per_night}`},
    {header:"Rooms",cell:r=>r.rooms},
  ];

  return(
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-semibold">Hotels</h1>
      <button onClick={()=>setOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded flex items-center gap-2">
        <Plus size={16}/> Add Hotel
      </button>
    </div>
    <DataTable columns={cols} data={hotels} loading={loading}
               onEdit={(r)=>{setEdit(r);setOpen(true);}} onDelete={del}/>
    <HotelFormModal isOpen={open} onClose={()=>{setOpen(false);setEdit(null);}}
                    onSubmit={submit} initialData={edit}/>
  </div>);
}
