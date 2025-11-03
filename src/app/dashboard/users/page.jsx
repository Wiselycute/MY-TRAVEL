"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { UserFormModal } from "@/components/dashboard/users/UserFormModal";
import { PasswordResetModal } from "@/components/dashboard/users/PasswordResetModal";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

const columns = [
  {
    header: "User",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {row?.name?.charAt(0).toUpperCase() || "?"}

        </div>
        <div>
          <div className="font-medium">{row.name}</div>
          <div className="text-xs text-muted-foreground">{row.email}</div>
        </div>
      </div>
    ),
  },
  {
    header: "Phone",
    cell: (row) => row.phone_number || "N/A",
  },
  {
    header: "Address",
    cell: (row) => row.address || "N/A",
  },
  {
    header: "Role",
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          row.role === "admin"
            ? "bg-purple-100 text-purple-800"
            : "bg-blue-100 text-blue-800"
        }`}
      >
        {row.role}
      </span>
    ),
  },
  {
    header: "Status",
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          row.status === "active"
            ? "bg-green-100 text-green-800"
            : row.status === "pending"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.status}
      </span>
    ),
  },
];

export default function UsersPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    role: '',
  });

  const fetchUsers = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: pagination.currentPage,
        limit: 10,
        ...filters
      });
      const response = await api.get(`/users?${queryParams}`);
      const result = response.data;

      if (Array.isArray(result)) {
        setData(result);
        setPagination((prev) => ({ ...prev, totalPages: Math.ceil(result.length / 10) || 1 }));
      } else {
        setData(result.users || result.data || []);
        setPagination((prev) => ({
          ...prev,
          totalPages: Math.ceil((result.total || (result.users?.length || 0)) / 10) || 1,
        }));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pagination.currentPage, filters]);

  const handleCreateUser = async (userData) => {
    try {
      await api.post("/users", userData);
      await fetchUsers();
      toast.success("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(error.message);
      throw error;
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      await api.put(`/users/${selectedUser._id || selectedUser.id}`, userData);
      await fetchUsers();
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.message);
      throw error;
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/users/${userId}`);
      await fetchUsers();
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.message);
    }
  };

  const handlePasswordReset = async (userId, newPassword) => {
    try {
      await api.post(`/users/${userId}/reset-password`, { password: newPassword });
      toast.success("Password reset successfully");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(error.message);
      throw error;
    }
  };

  const actions = {
    edit: (user) => {
      setSelectedUser(user);
      setIsModalOpen(true);
    },
    delete: handleDeleteUser,
    resetPassword: (user) => {
      setSelectedUser(user);
      setIsPasswordResetModalOpen(true);
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <button
          onClick={() => {
            setSelectedUser(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </button>
      </div>
      
      <div className="grid gap-6">
        <DataTable
          title="Users Management"
          columns={columns}
          data={data}
          loading={loading}
          actions={actions}
          pagination={{
            currentPage: pagination.currentPage,
            totalPages: pagination.totalPages,
            onPageChange: (page) => setPagination(prev => ({ ...prev, currentPage: page }))
          }}
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
        user={selectedUser}
      />

      <PasswordResetModal
        isOpen={isPasswordResetModalOpen}
        onClose={() => {
          setIsPasswordResetModalOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handlePasswordReset}
        userId={selectedUser?.id}
      />
    </div>
  )
};